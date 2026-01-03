// Unit conversion utilities (cm <-> inches)

export const convertCmToInches = (cm) => {
  if (cm === null || cm === undefined || cm === '') return null
  return (parseFloat(cm) / 2.54).toFixed(2)
}

export const convertInchesToCm = (inches) => {
  if (inches === null || inches === undefined || inches === '') return null
  return (parseFloat(inches) * 2.54).toFixed(2)
}

export const formatMeasurement = (value, unit) => {
  if (value === null || value === undefined || value === '') return ''
  const num = parseFloat(value)
  if (isNaN(num)) return ''
  return unit === 'cm' ? `${num} cm` : `${num}"`
}

