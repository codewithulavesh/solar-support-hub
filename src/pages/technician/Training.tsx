import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, PlayCircle, Award, CheckCircle } from 'lucide-react';

const skills = [
  { name: 'Solar Panel Installation', level: 'Advanced', certified: true },
  { name: 'Battery Maintenance', level: 'Expert', certified: true },
  { name: 'Inverter Repair', level: 'Intermediate', certified: false },
];

const courses = [
  { title: 'Advanced Wiring Techniques', progress: 60, duration: '2 hours' },
  { title: 'Customer Service Excellence', progress: 100, duration: '1 hour' },
];

export default function Training() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">🧑‍🎓 Skills & Training</h1>
      
      <Card>
        <CardHeader><CardTitle className="text-lg">My Skills</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {skills.map((skill, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">{skill.name}</p>
                <Badge variant="secondary">{skill.level}</Badge>
              </div>
              {skill.certified && <Award className="w-5 h-5 text-yellow-600" />}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Ongoing Training</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {courses.map((course, i) => (
            <div key={i} className="p-3 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium">{course.title}</p>
                {course.progress === 100 ? <CheckCircle className="w-5 h-5 text-success" /> : <span className="text-sm text-muted-foreground">{course.progress}%</span>}
              </div>
              <Progress value={course.progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{course.duration}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button className="w-full h-12"><GraduationCap className="mr-2" />Browse More Courses</Button>
    </div>
  );
}
