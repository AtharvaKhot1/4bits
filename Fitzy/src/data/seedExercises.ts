import { Exercise } from "../models/exercises";

// Office Workout Exercises
export const officeExercises: Exercise[] = [
  {
    id: "office-desk-pushups",
    name: "Desk Push-Ups",
    description: "A modified push-up exercise performed using your desk for support, perfect for toning arms and chest during work breaks.",
    category: "office",
    difficulty: "beginner",
    image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    videoUrl: "https://www.youtube.com/embed/S8NpRB8OJ8E",
    instructions: [
      "Stand facing your desk, about arm's length away.",
      "Place your palms flat on the edge of the desk, shoulder-width apart.",
      "Step back until your body is at an inclined angle, keeping feet together.",
      "Keeping your body straight, bend your elbows to lower your chest toward the desk.",
      "Push back up to the starting position.",
      "Repeat for 10-15 repetitions."
    ],
    tips: [
      "Keep your core engaged throughout the movement.",
      "The more upright your position, the easier the exercise.",
      "For more challenge, use a lower surface like a chair (if stable).",
      "Ensure your desk is stable and strong enough to support your weight."
    ],
    equipment: ["Desk"],
    targetMuscles: ["Chest", "Shoulders", "Triceps", "Core"],
    duration: 3,
    caloriesBurn: 15,
    requiresSpace: false
  },
  {
    id: "office-chair-squats",
    name: "Chair Squats",
    description: "A discreet lower-body strengthening exercise you can perform using your office chair as a guide for proper squat depth.",
    category: "office",
    difficulty: "beginner",
    image: "https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80",
    instructions: [
      "Stand in front of your chair with feet shoulder-width apart.",
      "Keeping your chest up and core engaged, bend your knees and hips to lower yourself as if sitting down.",
      "Lower until your buttocks barely touch the chair, then immediately stand back up.",
      "Focus on pushing through your heels as you return to standing position.",
      "Repeat for 10-15 repetitions."
    ],
    tips: [
      "Keep your weight in your heels to prevent knee strain.",
      "Avoid fully sitting down to maintain muscle tension.",
      "For additional challenge, hold the lowered position for 2-3 seconds.",
      "Ensure your chair is stable and won't roll away during the exercise."
    ],
    equipment: ["Chair"],
    targetMuscles: ["Quadriceps", "Hamstrings", "Glutes", "Core"],
    duration: 4,
    caloriesBurn: 25,
    requiresSpace: false
  },
  {
    id: "office-seated-leg-raises",
    name: "Seated Leg Raises",
    description: "An inconspicuous exercise to strengthen your core and leg muscles while sitting at your desk.",
    category: "office",
    difficulty: "beginner",
    image: "https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    instructions: [
      "Sit upright in your chair with good posture, feet flat on the ground.",
      "Engage your core and straighten one leg until it's parallel to the floor.",
      "Hold for 5 seconds while keeping your thigh muscles tight.",
      "Slowly lower your leg back to the starting position.",
      "Repeat with the opposite leg.",
      "Complete 10 repetitions per leg."
    ],
    tips: [
      "Maintain proper posture with shoulders back and core engaged.",
      "For more challenge, hold the extended position longer.",
      "To increase difficulty, point your toes to engage calf muscles.",
      "This exercise can be done without anyone noticing during meetings."
    ],
    equipment: ["Chair"],
    targetMuscles: ["Quadriceps", "Core", "Hip Flexors"],
    duration: 3,
    caloriesBurn: 10,
    requiresSpace: false
  },
  {
    id: "office-seated-shoulder-stretch",
    name: "Seated Shoulder Stretch",
    description: "A gentle stretch to relieve tension in the shoulders and upper back from prolonged computer work.",
    category: "office",
    difficulty: "beginner",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    instructions: [
      "Sit upright in your chair with feet flat on the floor.",
      "Bring your right arm across your chest at shoulder height.",
      "Use your left hand to gently pull the right arm closer to your chest.",
      "Hold the stretch for 15-30 seconds, feeling the stretch in your shoulder.",
      "Release and repeat with the left arm.",
      "Perform 2-3 stretches per side."
    ],
    tips: [
      "Don't pull too hard - the stretch should feel good, not painful.",
      "Keep breathing normally throughout the stretch.",
      "For a deeper stretch, slightly turn your head away from the arm being stretched.",
      "Perform this stretch whenever you feel shoulder tightness."
    ],
    equipment: ["Chair"],
    targetMuscles: ["Shoulders", "Upper Back"],
    duration: 2,
    caloriesBurn: 5,
    requiresSpace: false
  },
  {
    id: "office-wrist-stretches",
    name: "Wrist and Forearm Stretches",
    description: "Essential stretches to prevent carpal tunnel syndrome and relieve tension from typing and mouse use.",
    category: "office",
    difficulty: "beginner",
    image: "https://images.unsplash.com/photo-1506126279646-a697353d3166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    instructions: [
      "Extend your right arm forward with palm up.",
      "Use your left hand to gently pull the fingers of your right hand towards your body.",
      "Hold for 15-20 seconds, feeling the stretch in your wrist and forearm.",
      "Flip your palm down and gently press down on the back of your hand.",
      "Hold for another 15-20 seconds.",
      "Repeat with the left wrist."
    ],
    tips: [
      "Perform these stretches every hour during intensive computer work.",
      "Keep the stretches gentle to avoid strain.",
      "Combine with gentle wrist rotations for complete mobility.",
      "If you feel pain (not just stretching), consult a healthcare professional."
    ],
    equipment: [],
    targetMuscles: ["Wrists", "Forearms"],
    duration: 2,
    caloriesBurn: 5,
    requiresSpace: false
  }
];

// Home Workout Exercises
export const homeExercises: Exercise[] = [
  {
    id: "home-bodyweight-squats",
    name: "Bodyweight Squats",
    description: "A fundamental lower body exercise that requires no equipment and builds strength in the legs and glutes.",
    category: "home",
    difficulty: "beginner",
    image: "https://images.unsplash.com/photo-1566241142559-40a9552bd7ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    videoUrl: "https://www.youtube.com/embed/YaXPRqUwItQ",
    instructions: [
      "Stand with feet slightly wider than hip-width apart, toes slightly pointed outward.",
      "Keep your chest up and core engaged.",
      "Bend your knees and push your hips back as if sitting in a chair.",
      "Lower until your thighs are at least parallel to the ground, or as low as comfortable.",
      "Push through your heels to return to the starting position.",
      "Repeat for 15-20 repetitions."
    ],
    tips: [
      "Keep your knees tracking over your toes, not caving inward.",
      "Maintain weight in your heels throughout the movement.",
      "For balance issues, you can squat onto a chair or hold onto a sturdy object.",
      "To increase difficulty, slow down the movement or add a pause at the bottom."
    ],
    equipment: [],
    targetMuscles: ["Quadriceps", "Hamstrings", "Glutes", "Core"],
    duration: 5,
    caloriesBurn: 35,
    requiresSpace: true
  },
  {
    id: "home-pushups",
    name: "Push-Ups",
    description: "A classic upper body exercise that strengthens multiple muscle groups simultaneously using just your bodyweight.",
    category: "home",
    difficulty: "intermediate",
    image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4",
    instructions: [
      "Start in a plank position with hands slightly wider than shoulder-width apart.",
      "Keep your body in a straight line from head to heels.",
      "Lower your body by bending your elbows until your chest nearly touches the floor.",
      "Push back up to the starting position by straightening your arms.",
      "Repeat for 10-15 repetitions."
    ],
    tips: [
      "Keep your core tight throughout the movement to maintain proper form.",
      "For an easier version, perform push-ups on your knees or against a wall.",
      "To increase difficulty, elevate your feet or try diamond push-ups (hands close together).",
      "Focus on quality over quantity - proper form prevents injury."
    ],
    equipment: [],
    targetMuscles: ["Chest", "Shoulders", "Triceps", "Core"],
    duration: 5,
    caloriesBurn: 30,
    requiresSpace: true
  },
  {
    id: "home-plank",
    name: "Plank",
    description: "An isometric core strengthening exercise that improves posture and builds endurance in your abdominal muscles.",
    category: "home",
    difficulty: "beginner",
    image: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    instructions: [
      "Start in a push-up position, then bend your elbows and rest your weight on your forearms.",
      "Your body should form a straight line from your head to your heels.",
      "Engage your core by pulling your belly button toward your spine.",
      "Hold this position while breathing normally.",
      "Aim to hold for 30-60 seconds, working up to longer durations over time."
    ],
    tips: [
      "Don't let your hips sag down or pike up - maintain that straight line.",
      "Keep your neck neutral by looking at a spot on the floor just in front of your hands.",
      "For an easier version, perform the plank with knees on the ground.",
      "For more challenge, try lifting one limb at a time while maintaining form."
    ],
    equipment: [],
    targetMuscles: ["Core", "Shoulders", "Back", "Glutes"],
    duration: 3,
    caloriesBurn: 20,
    requiresSpace: true
  },
  {
    id: "home-lunges",
    name: "Walking Lunges",
    description: "A dynamic lower body exercise that works one leg at a time to improve strength, balance, and mobility.",
    category: "home",
    difficulty: "intermediate",
    image: "https://images.unsplash.com/photo-1577221084712-45b0445d2b00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    instructions: [
      "Stand with feet hip-width apart and hands on hips or at your sides.",
      "Take a large step forward with your right foot.",
      "Lower your body until both knees are bent at approximately 90-degree angles.",
      "Your back knee should hover just above the ground without touching it.",
      "Push off with your right foot to bring your left foot forward into the next lunge.",
      "Continue alternating legs for 10-12 lunges per side."
    ],
    tips: [
      "Keep your upper body straight with shoulders back and relaxed.",
      "Take big enough steps to create proper knee angles.",
      "For balance issues, perform stationary lunges holding onto a chair or wall.",
      "To increase intensity, hold household items as weights or perform deeper lunges."
    ],
    equipment: [],
    targetMuscles: ["Quadriceps", "Hamstrings", "Glutes", "Calves"],
    duration: 6,
    caloriesBurn: 40,
    requiresSpace: true
  },
  {
    id: "home-mountain-climbers",
    name: "Mountain Climbers",
    description: "A high-intensity exercise that combines cardio and strength training while targeting multiple muscle groups.",
    category: "home",
    difficulty: "intermediate",
    image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80",
    instructions: [
      "Start in a push-up position with arms straight and body in a straight line.",
      "Quickly bring your right knee toward your chest, then return it to the starting position.",
      "Immediately repeat with your left knee.",
      "Continue alternating legs at a brisk pace, as if running in place in a plank position.",
      "Aim for 30-60 seconds of continuous movement."
    ],
    tips: [
      "Keep your core tight to prevent your hips from sagging or rising too high.",
      "Start slowly to master the form, then increase speed.",
      "For less intensity, slow down the pace or take breaks as needed.",
      "For more challenge, increase speed or add a push-up between sets."
    ],
    equipment: [],
    targetMuscles: ["Core", "Shoulders", "Hip Flexors", "Quads"],
    duration: 4,
    caloriesBurn: 50,
    requiresSpace: true
  }
];

// Combined Exercises
export const allExercises: Exercise[] = [...officeExercises, ...homeExercises];
