import React, { useState } from "react"
import Select from "react-select"
import { Box } from "@mui/material"

export default function MultiSelect({
  noOfSubjects,
  teachers,
  sendTheTeachers,
}) {
  const [selectedOptions, setSelectedOptions] = useState()
  const teacherOptions = teachers.map((teacher) => ({
    value: teacher.name,
    label: teacher.name,
    isDisabled: teacher.isAssignedToTwoSubjects, // Disable options where isAssignedToTwoSubjects is true
  }))

  function handleSelect(data) {
    setSelectedOptions(data)
    sendTheTeachers(data)
  }

  return (
    <Box>
      <Select
        options={teacherOptions}
        placeholder="Select teacher"
        value={selectedOptions}
        isDisabled={selectedOptions && selectedOptions.length === noOfSubjects}
        onChange={handleSelect}
        isSearchable={true}
        isMulti
      />
    </Box>
  )
}
