export const PoleLengths = [
  "9'1\"",
  "10'1\"",
  "10'7\"",
  "11'1\"",
  "11'7\"",
  "12'1\"",
  "12'7\"",
  "13'1\"",
  "13'7\"",
  "14'1\"",
  "14'7\"",
  "15'1\"",
  "15'7\"",
  "16'1\"",
] as const

export const PoleLengthsMetric: Record<typeof PoleLengths[number], number> = {
  "9'1\"": 275,
  "10'1\"": 305,
  "10'7\"": 320,
  "11'1\"": 335,
  "11'7\"": 350,
  "12'1\"": 365,
  "12'7\"": 385,
  "13'1\"": 400,
  "13'7\"": 415,
  "14'1\"": 430,
  "14'7\"": 445,
  "15'1\"": 460,
  "15'7\"": 475,
  "16'1\"": 490,
} as const

export const PoleStatus = ["Active", "Sold", "Rented", "Broke", "Pending"] as const