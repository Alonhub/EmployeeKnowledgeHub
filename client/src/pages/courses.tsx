import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Course } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, BookOpen, Star, GraduationCap } from "lucide-react";

export default function CoursesPage() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: courses = [], isLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
    enabled: true,
  });

  const { data: featuredCourses = [] } = useQuery<Course[]>({
    queryKey: ['/api/courses/featured'],
    enabled: true,
  });

  const categories = 
    Array.from(new Set(courses.map((course) => course.category).filter(Boolean))) as string[]; 

  const filteredCourses = selectedCategory ? 
    courses.filter((course) => course.category === selectedCategory) : 
    courses;

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="flex flex-col h-full">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <Skeleton className="h-20 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {featuredCourses.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Star className="mr-2 h-5 w-5 text-yellow-500" />
                  Featured Courses
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} onClick={() => setLocation(`/dashboard?courseId=${course.id}`)} />
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Course Categories</h2>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={selectedCategory === null ? "default" : "outline"} 
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </Button>
                {categories.map((category) => (
                  <Button 
                    key={category} 
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} onClick={() => setLocation(`/dashboard?courseId=${course.id}`)} />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

function CourseCard({ course, onClick }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{course.title}</CardTitle>
          {course.featured && <Badge variant="default">Featured</Badge>}
        </div>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col gap-2 text-sm">
          {course.level && (
            <div className="flex items-center">
              <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{course.level}</span>
            </div>
          )}
          {course.duration && (
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{course.duration}</span>
            </div>
          )}
          {course.category && (
            <div className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{course.category}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onClick}>
          Start Course
        </Button>
      </CardFooter>
    </Card>
  );
}