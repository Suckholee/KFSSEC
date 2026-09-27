import { useEffect, useState } from 'react';
import { fetchCoursesFromAPI, getCoursesFromDB } from '../services/courseDatabase';

export default function useCourses() {
  const [courses, setCourses] = useState(getCoursesFromDB);
  useEffect(() => {
    const refresh = () => setCourses(getCoursesFromDB());
    window.addEventListener('kfssec_courses_updated', refresh);
    fetchCoursesFromAPI().catch(error => console.error('Course load failed:', error));
    return () => window.removeEventListener('kfssec_courses_updated', refresh);
  }, []);
  return courses;
}
