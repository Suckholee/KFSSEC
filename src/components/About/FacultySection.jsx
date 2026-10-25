import React from 'react';
import ProfileDirectory from './ProfileDirectory';
export default function FacultySection({ facultyList }) {
  return <ProfileDirectory collection="faculty" fallback={facultyList} />;
}
