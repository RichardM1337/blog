---
title: "Django for Dummies"
description: "How being placed onto a random project completely changed my view of backend "
pubDate: "Jul 15 2022"
heroImage: "/languages/dj.png"
extLink: https://github.com/sitechtimes/course-selection-backend
---

## Background

When I entered my junior year of high school, I was enrolled in a class called Advanced Computer Applications. The point of the class was to serve as a continuation of the computer science courses, which ended at APCSP.

As much as I love the class and everyone I met, I have to be honest and tell you what it actually was:

CHILD LABOR.

## What is this project?

I and a few of my peers were tasked with continuing the backend for a project that would allow students to automatically choose classes for themselves. Previously, this system was done by paper, hard to track, and caused a lot of strain for the guidance counselors in the school.

## Technical Skills

For a large portion of this project, I had to learn new things about backend that I was unfamiliar with. My heart, unfortunately, lies in the world of express.js, so I was naturally confused when encountering extremely large classes like...

```python
class MeetingSerializer(CustomSerializer):
    student = serializers.CharField(source="student.__str__", read_only=True)
    grade = serializers.IntegerField(source="student.grade", read_only=True)
    notify = serializers.BooleanField(default=False, write_only=True)
    student_id = serializers.IntegerField(source="student.id", required=False)
    date = serializers.DateTimeField(required=False)

    class Meta:
        model = Meeting
        fields = [
            "id", "student_id", "student", "date", "memo", "grade", "period", "notify"
        ]
        read_only_fields = ["id", 'grade', "notify"]

    def create(self, validated_data):
        if self.context.get('delete'):
            raise serializers.ValidationError({"delete": "Instance does not exist."})
        student_id = validated_data.get("student").get("id")
        guidance = self.context.get('request').user
        try:
            student = User.objects.get(id=student_id, is_guidance=False)
        except User.DoesNotExist:
            raise serializers.ValidationError({"student_id": "Invalid student ID."})

        if not validated_data.get('date'):
            raise serializers.ValidationError({"date": "Date is required."})

        meeting = Meeting.objects.create(
            student=student,
            guidance=guidance,
            date=validated_data['date'],
            period=validated_data.get('period'),
            memo=validated_data.get('memo', ""),
        )
        if validated_data.get('notify'):
            CustomEmail("set_meeting").send(meeting.id)
        return meeting

    def update(self, inst, validated_data):
        if self.context.get('delete'):
            CustomEmail("cancel_meeting").send(inst.id)
            inst.delete()
            return inst

        old_date = inst.date

        if 'date' in validated_data:
            inst.date = validated_data['date']

        inst.memo = validated_data.get('memo', inst.memo)
        inst.period = validated_data.get('period', inst.period)
        inst.save()

        if validated_data.get('notify') and old_date != inst.date:
            formatted_old_time = timezone.localtime(old_date).strftime('%A, %B %d, %Y') + " at " + timezone.localtime(old_date).strftime('%I:%M %p')
            CustomEmail("change_meeting").send(inst.id, old_meeting_time=formatted_old_time)

        return inst
```

I and a partner were tasked to add a completely new feature to the website where users can actually begin the functionality of completing course surveys, and guidance counselors can look at them.

My solution to my inexperience in Django was to do a lot of research. I watched a lot of youtube videos, consulted a lot of templates, and even created a local template project to test in.

## Reflection

I'm actually very glad to have worked in Django. I enjoy express due to its ease, but I think that as a backend developer there's a very high chance, I'm going to be asked to work with extremely robust environments with large portions of data with explicit types. Learning about things like Django and other database management-based applications.
