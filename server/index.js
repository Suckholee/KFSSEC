import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const DB_FILE = path.join(__dirname, 'data', 'courses.json');
const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Helper to read courses DB
function readDB() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB file:', err);
    return [];
  }
}

// Helper to write courses DB
function writeDB(courses) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(courses, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing DB file:', err);
  }
}

// REST API 1: GET All Courses
app.get('/api/courses', (req, res) => {
  const courses = readDB();
  res.json({ success: true, count: courses.length, data: courses });
});

// REST API 2: GET Course by ID
app.get('/api/courses/:id', (req, res) => {
  const courses = readDB();
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }
  res.json({ success: true, data: course });
});

// REST API 3: POST Create Course
app.post('/api/courses', (req, res) => {
  const courses = readDB();
  const newCourse = {
    id: req.body.id || `c_${Date.now()}`,
    ...req.body,
  };
  courses.unshift(newCourse);
  writeDB(courses);
  console.log(`[REAL DB SERVER] Created new course: ${newCourse.title} (${newCourse.id})`);
  res.json({ success: true, data: newCourse });
});

// REST API 4: PUT Update Course
app.put('/api/courses/:id', (req, res) => {
  const courses = readDB();
  const index = courses.findIndex((c) => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }
  courses[index] = {
    ...courses[index],
    ...req.body,
    id: req.params.id,
  };
  writeDB(courses);
  console.log(`[REAL DB SERVER] Updated course: ${courses[index].title} (${req.params.id})`);
  res.json({ success: true, data: courses[index] });
});

// REST API 5: DELETE Course
app.delete('/api/courses/:id', (req, res) => {
  let courses = readDB();
  const exists = courses.some((c) => c.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }
  courses = courses.filter((c) => c.id !== req.params.id);
  writeDB(courses);
  console.log(`[REAL DB SERVER] Deleted course: ${req.params.id}`);
  res.json({ success: true, message: 'Course deleted successfully' });
});

// REST API 6: POST Direct Computer Image File Upload
app.post('/api/upload', (req, res) => {
  try {
    const { imageBase64, fileName } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ success: false, message: 'No image data provided' });
    }

    const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ success: false, message: 'Invalid base64 string' });
    }

    const ext = matches[1].split('/')[1] || 'png';
    const buffer = Buffer.from(matches[2], 'base64');
    const safeName = `img_${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, safeName);

    fs.writeFileSync(filePath, buffer);
    const publicUrl = `/uploads/${safeName}`;

    console.log(`[REAL DB SERVER] Saved uploaded image file to ${filePath} -> ${publicUrl}`);
    res.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error('File upload error:', err);
    res.status(500).json({ success: false, message: 'File upload failed' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Real REST API Database & File Upload Server running on http://localhost:${PORT}`);
});
