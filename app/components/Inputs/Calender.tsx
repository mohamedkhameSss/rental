'use client'
import React from 'react'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
interface CalenderProps {
    value: Range
    disabledDates? :Date[]
    onChange:(value:RangeKeyDict)=>void
}
const Calender:React.FC<CalenderProps> = ({
    value,disabledDates,onChange
}) => {
  return (
    <>
    <DateRange
    rangeColors={['#262626']}
    ranges={[value]}
    date={new Date()}
    onChange={onChange}
    direction='vertical'
    showDateDisplay={false}
    minDate={new Date()}
    disabledDates={disabledDates}
    />
    </>
  )
}

export default Calender