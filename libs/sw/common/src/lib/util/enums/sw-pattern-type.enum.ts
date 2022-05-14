export enum SwPatternType {
  EN = '^[A-Za-z]+$',
  PHONE = '^[0-9-()]+$',
  NUMBER = '^[0-9]+$',
  EN_NUMBER_DASH = '^[A-Za-z0-9_-]+$',
  EN_NUMBER = '^[A-Za-z0-9]+$',
  ACCOUNT = '^[A-Za-z0-9_@.-]+$',
  NUMBER_DOT = '^[0-9.]+$'
}
