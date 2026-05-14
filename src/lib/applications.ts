export type ApplicationType = 'member' | 'committee' | 'external'
export type ApplicationStatus = 'pending' | 'accepted' | 'rejected'

export type ApplicationSubmissionPayload = {
  type?: ApplicationType
  registration?: ApplicationType
  first_name?: string
  last_name?: string
  email?: string
  city?: string
  motivation?: string
  university?: string
  academic_department?: string
  company?: string
  industry?: string
  experience?: string
  preferred_role?: string
  committee_role?: string
  time_commit?: string
  time_commitment?: string
  leadership_exp?: string
  leadership_experience?: string
}

export type ApplicationInsertRow = {
  first_name: string
  last_name: string
  email: string
  city: string
  motivation: string
  registration: ApplicationType
  university: string | null
  academic_department: string | null
  company: string | null
  industry: string | null
  experience: string | null
  preferred_role: string | null
  time_commit: string | null
  leadership_exp: string | null
  status: ApplicationStatus
  submitted_at: string
  reviewed_at: string | null
  created_at: string
}

export class ApplicationValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ApplicationValidationError'
  }
}

function normalizeText(value: unknown) {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

function requireText(value: unknown, fieldName: string) {
  const normalized = normalizeText(value)

  if (!normalized) {
    throw new ApplicationValidationError(`Missing required field: ${fieldName}`)
  }

  return normalized
}

function isApplicationType(value: unknown): value is ApplicationType {
  return value === 'external' || value === 'member' || value === 'committee'
}

function resolveRegistration(payload: ApplicationSubmissionPayload): ApplicationType {
  if (isApplicationType(payload.registration)) {
    return payload.registration
  }

  if (isApplicationType(payload.type)) {
    return payload.type
  }

  return 'external'
}

function resolveApplicationKind(payload: ApplicationSubmissionPayload): ApplicationType {
  if (payload.type === 'member' || payload.type === 'committee') {
    return payload.type
  }

  if (payload.registration === 'member' || payload.registration === 'committee') {
    return payload.registration
  }

  if (payload.preferred_role || payload.committee_role) {
    return 'committee'
  }

  return 'member'
}

export function buildApplicationInsertRow(
  payload: ApplicationSubmissionPayload,
  now = new Date()
): ApplicationInsertRow {
  const applicationKind = resolveApplicationKind(payload)
  const registration = resolveRegistration(payload)
  const experience = normalizeText(payload.experience)
  const preferredRole = normalizeText(payload.preferred_role ?? payload.committee_role)
  const timeCommit = normalizeText(payload.time_commit ?? payload.time_commitment)
  const leadershipExp = normalizeText(payload.leadership_exp ?? payload.leadership_experience)

  const requiredFieldNames = [
    ['first_name', payload.first_name],
    ['last_name', payload.last_name],
    ['email', payload.email],
    ['city', payload.city],
    ['motivation', payload.motivation],
    ['experience', experience],
  ] as const

  for (const [fieldName, value] of requiredFieldNames) {
    requireText(value, fieldName)
  }

  if (applicationKind === 'member') {
    requireText(payload.university, 'university')
    requireText(payload.academic_department, 'academic_department')
  }

  if (applicationKind === 'committee') {
    requireText(preferredRole, 'preferred_role')
    requireText(timeCommit, 'time_commit')
    requireText(leadershipExp, 'leadership_exp')
  }

  return {
    first_name: requireText(payload.first_name, 'first_name'),
    last_name: requireText(payload.last_name, 'last_name'),
    email: requireText(payload.email, 'email'),
    city: requireText(payload.city, 'city'),
    motivation: requireText(payload.motivation, 'motivation'),
    registration,
    university: normalizeText(payload.university),
    academic_department: normalizeText(payload.academic_department),
    company: normalizeText(payload.company),
    industry: normalizeText(payload.industry),
    experience,
    preferred_role: preferredRole,
    time_commit: timeCommit,
    leadership_exp: leadershipExp,
    status: 'pending',
    submitted_at: now.toISOString(),
    reviewed_at: null,
    created_at: now.toISOString(),
  }
}

export function isReviewStatus(value: unknown): value is ApplicationStatus {
  return value === 'pending' || value === 'accepted' || value === 'rejected'
}