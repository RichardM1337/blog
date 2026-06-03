---
title: "The greatest commit in history"
description: "only 1 line"
pubDate: "Jul 15 2022"
heroImage: "./commit.png"
---

## Introduction

A long long time ago, in a galaxy far far away, someone thought it would be a great idea to hand over an entire project part of my school for me to personally maintain. Great idea by the way. I'm great at programming ^\_^.

## The project

I was tasked to maintain the school's course catalog. The website was intended to be a a starting point for future students and current students to take a look at the courses the school offered. The website had to be built extremely robustly, in order to support constantly changing course codes, teachers, and other types of unique data.

## The issue

The original writers of the website had contributed a great deal of time and energy into array manipulation in order to create a 'schedule builder'. They wrote in extreme edge cases that school had enforced; for example, the builder would not let you have more than 2 electives, or take two classes that conflict in credit.

```typescript
if (x.doublePeriod) {
  let empty = this.schedule.findIndex((obj) => obj.name === undefined);
  this.schedule.splice(empty, 1);
}
```

This struggle included this line as well, which was a checker for if a class counted as a double period. If it was, it forced the next box in the array to be empty, and spliced it so that the schedule would display 2 boxes for a class and prevent any classes to be added on top of it.

However, somewhere along the line of the maintenance of this project, the double period feature broke. This was a major mistake, because extremely significant classes for credits like AP Physics 2 or AP Calculus BC were double period classes, and my school made it an effort to ensure that students knew they had to wok hit around their schedule. Even I was not able to take some of these extremely important and long classes, because of my pursuit in 2 electives.

## The solution

Stop.

Take a deep breath.

I want you to think about what the solution to this project might be. Rubber-ducky it out. Maybe the schedule array was not allowing the splice. Maybe `findIndex` was breaking. Maybe TypeScript was upset at obj's lack of text declaration. Maybe it was because this project just broke randomly, as some do.

```vue
<div
  class="flex justify-between items-center px-3 py-2 rounded-[16px] gap-x-4 h-[50px] border"
  :id="course.double_period"
>
    ...
</div>
```

Look at this snippet. Now look back at the other one. Now back at me.

Someone in the last 2 years of this project had randomly, for no particular reason, attempted to iterate through the double period property in Vue in snake case, and not the camel case that the rest of the code was in.

![A GitHub commit with only a single line of code changed. 'double_period' was changed to 'doublePeriod'](./the-best-commit.png)

Thus ends the era of the greatest commit of all time. That took me 2 days. Check your cases, people.
