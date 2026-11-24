import { toBlockLetters, toPrintedName } from '../printed-name'

export type EmploymentStatus = 'permanent' | 'jobOrder' | 'contractual' | 'others'

export type OtafFormData = {
  controlNumber?: string
  dateRequested?: string
  verificationCode?: string
  verificationUrl?: string

  employeeName?: string
  employeeId?: string
  position?: string
  officeDepartment?: string

  employmentStatus?: EmploymentStatus
  employmentStatusOther?: string
  dateOfOvertime?: string

  timeIn?: string
  timeOut?: string
  estimatedTotalHours?: string

  purposeJustification?: string
  activityProject?: string
  fundingSource?: string

  supervisorName?: string
  supervisorPosition?: string
  supervisorDate?: string

  departmentHeadName?: string
  departmentHeadPosition?: string
  departmentHeadDate?: string

  hrmoName?: string
  hrmoPosition?: string
  hrmoDate?: string

  employeeSignatureName?: string
  employeeSignatureDate?: string
}

export const OTAF_PRINTED_NAME_KEYS = [
  'employeeName',
  'supervisorName',
  'departmentHeadName',
  'hrmoName',
  'employeeSignatureName',
] as const

export const OTAF_BLOCK_LETTER_KEYS = [
  'controlNumber',
  'dateRequested',
  'verificationCode',
  'employeeId',
  'position',
  'officeDepartment',
  'employmentStatusOther',
  'dateOfOvertime',
  'timeIn',
  'timeOut',
  'estimatedTotalHours',
  'fundingSource',
  'supervisorPosition',
  'supervisorDate',
  'departmentHeadPosition',
  'departmentHeadDate',
  'hrmoPosition',
  'hrmoDate',
  'employeeSignatureDate',
] as const

/** Uppercases all OTAF text fields except purposeJustification, activityProject, and verificationUrl. */
export function withPrintedOtafFields<T extends OtafFormData>(data: T): T {
  const next = { ...data }
  for (const key of OTAF_PRINTED_NAME_KEYS) {
    if (next[key] !== undefined) next[key] = toPrintedName(next[key])
  }
  for (const key of OTAF_BLOCK_LETTER_KEYS) {
    if (next[key] !== undefined) next[key] = toBlockLetters(next[key])
  }
  return next
}

export type OtafRecord = OtafFormData & {
  id: string
  createdAt: string
  updatedAt: string
}
