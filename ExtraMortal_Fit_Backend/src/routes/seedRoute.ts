import express, { Request, Response } from "express";
import multer from "multer";
import * as cloudinary from "cloudinary";
import * as fs from "fs";
import * as path from "path";

const upload = multer();

const objectsWithIds =  [
  {
    "bodyPart": "lower legs",
    "equipment": "body weight",
    "gifUrl": "https://v2.exercisedb.io/image/DdRVsAS7IfuJRm",
    "id": "1368",
    "name": "ankle circles",
    "target": "calves",
    "secondaryMuscles": [
      "ankle stabilizers"
    ],
    "instructions": [
      "Sit on the ground with your legs extended in front of you.",
      "Lift one leg off the ground and rotate your ankle in a circular motion.",
      "Perform the desired number of circles in one direction, then switch to the other direction.",
      "Repeat with the other leg."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "assisted",
    "gifUrl": "https://v2.exercisedb.io/image/HVnhLEbOofx95Q",
    "id": "1708",
    "name": "assisted lying calves stretch",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings"
    ],
    "instructions": [
      "Lie on your back with your legs extended.",
      "Bend one knee and place your foot flat on the ground.",
      "Using your hands or a towel, gently pull your toes towards your body, feeling a stretch in your calf.",
      "Hold the stretch for 20-30 seconds.",
      "Release the stretch and repeat on the other leg."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "band",
    "gifUrl": "https://v2.exercisedb.io/image/s626g0IcWfxhfp",
    "id": "0999",
    "name": "band single leg calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "ankles",
      "feet"
    ],
    "instructions": [
      "Stand with your feet hip-width apart and place the band around the ball of your left foot.",
      "Hold onto a stable object for balance if needed.",
      "Slowly raise your left heel off the ground, lifting your body weight onto the ball of your foot.",
      "Pause for a moment at the top, then slowly lower your left heel back down to the starting position.",
      "Repeat for the desired number of repetitions, then switch to the right leg."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "band",
    "gifUrl": "https://v2.exercisedb.io/image/a1UsAFphVCIIVH",
    "id": "1000",
    "name": "band single leg reverse calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Stand with your feet hip-width apart and place the band around the ball of your foot.",
      "Hold onto a stable object for balance.",
      "Slowly raise your heel off the ground, lifting your body weight onto the ball of your foot.",
      "Pause for a moment at the top, then slowly lower your heel back down to the starting position.",
      "Repeat for the desired number of repetitions, then switch to the other leg."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "band",
    "gifUrl": "https://v2.exercisedb.io/image/rwQHZrGLvfby1B",
    "id": "1369",
    "name": "band two legs calf raise - (band under both legs) v. 2",
    "target": "calves",
    "secondaryMuscles": [
      "ankles",
      "feet"
    ],
    "instructions": [
      "Stand with your feet shoulder-width apart and place a resistance band under both feet.",
      "Hold the ends of the band with your hands for stability.",
      "Raise your heels off the ground as high as possible, using your calves.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "barbell",
    "gifUrl": "https://v2.exercisedb.io/image/HTMhrujhtGrU2V",
    "id": "1370",
    "name": "barbell floor calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings"
    ],
    "instructions": [
      "Place a barbell on the floor in front of you.",
      "Stand with the balls of your feet on the edge of the barbell, with your heels hanging off.",
      "Hold onto a stable object for balance if needed.",
      "Raise your heels as high as possible, using your calves to lift your body.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "barbell",
    "gifUrl": "https://v2.exercisedb.io/image/-i3lrHj7-TirvS",
    "id": "0088",
    "name": "barbell seated calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "quadriceps"
    ],
    "instructions": [
      "Sit on a bench with your feet flat on the floor and a barbell resting on your thighs.",
      "Place the balls of your feet on a raised platform, such as a block or step.",
      "Position the barbell across your thighs and hold it securely with your hands.",
      "Keeping your back straight and your core engaged, lift your heels off the ground by extending your ankles.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "barbell",
    "gifUrl": "https://v2.exercisedb.io/image/05DAqLarDdP7u7",
    "id": "1371",
    "name": "barbell seated calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings"
    ],
    "instructions": [
      "Sit on a bench with your feet flat on the floor and a barbell resting on your thighs.",
      "Place the balls of your feet on a raised platform, such as a block or step.",
      "Lower your heels as far as possible, feeling a stretch in your calves.",
      "Raise your heels as high as possible, contracting your calves.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "barbell",
    "gifUrl": "https://v2.exercisedb.io/image/YW8ePKLyGSSFuG",
    "id": "1372",
    "name": "barbell standing calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Stand with your feet shoulder-width apart and place a barbell across your upper back.",
      "Raise your heels off the ground as high as possible, using only your toes.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "barbell",
    "gifUrl": "https://v2.exercisedb.io/image/2Cxz5CGNoY1bRg",
    "id": "0108",
    "name": "barbell standing leg calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Stand with your feet shoulder-width apart and place a barbell across your upper back.",
      "Raise your heels off the ground as high as possible, using your calves.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "barbell",
    "gifUrl": "https://v2.exercisedb.io/image/swtHWVsDau9saO",
    "id": "0111",
    "name": "barbell standing rocking leg calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "quadriceps"
    ],
    "instructions": [
      "Stand with your feet shoulder-width apart and hold a barbell across your upper back.",
      "Raise your heels off the ground as high as possible, balancing on the balls of your feet.",
      "Slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "body weight",
    "gifUrl": "https://v2.exercisedb.io/image/cDI6jrLfOXQY3e",
    "id": "1373",
    "name": "bodyweight standing calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "ankles",
      "feet"
    ],
    "instructions": [
      "Stand with your feet shoulder-width apart, toes pointing forward.",
      "Place your hands on a wall or stable surface for balance.",
      "Slowly raise your heels off the ground, lifting your body weight onto the balls of your feet.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "body weight",
    "gifUrl": "https://v2.exercisedb.io/image/7Sot7tvXAYWOxE",
    "id": "1374",
    "name": "box jump down with one leg stabilization",
    "target": "calves",
    "secondaryMuscles": [
      "quadriceps",
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Stand in front of a box or platform with your feet shoulder-width apart.",
      "Bend your knees and jump onto the box, landing softly with one foot on the box and the other foot hanging off the edge.",
      "Stabilize yourself on the box with the foot that is on it, while keeping the other foot off the ground.",
      "Hold this position for a few seconds, engaging your calf muscles to maintain balance.",
      "Slowly step down with the foot that is on the box, returning to the starting position.",
      "Repeat the exercise with the other leg."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "cable",
    "gifUrl": "https://v2.exercisedb.io/image/afoDvbDmixsDZl",
    "id": "1375",
    "name": "cable standing calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Stand facing a cable machine with your feet shoulder-width apart.",
      "Hold onto the cable machine handles or attach a cable ankle strap to your ankles.",
      "Raise your heels off the ground by extending your ankles as high as possible.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "cable",
    "gifUrl": "https://v2.exercisedb.io/image/SAfLkt2YjdUYS-",
    "id": "1376",
    "name": "cable standing one leg calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "ankles",
      "feet"
    ],
    "instructions": [
      "Stand facing a cable machine with your feet shoulder-width apart.",
      "Hold onto the cable machine for support.",
      "Lift one leg off the ground and balance on the other leg.",
      "Slowly raise your heel off the ground, lifting your body up onto your toes.",
      "Pause for a moment at the top, then slowly lower your heel back down to the starting position.",
      "Repeat for the desired number of repetitions, then switch legs."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "body weight",
    "gifUrl": "https://v2.exercisedb.io/image/RUgtYbO51FDAol",
    "id": "1407",
    "name": "calf push stretch with hands against wall",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings"
    ],
    "instructions": [
      "Stand facing a wall with your feet hip-width apart.",
      "Place your hands against the wall at shoulder height.",
      "Step back with one foot, keeping your heel on the ground and your leg straight.",
      "Bend your front knee slightly and lean forward, feeling a stretch in your calf.",
      "Hold the stretch for 20-30 seconds.",
      "Switch legs and repeat the stretch."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "body weight",
    "gifUrl": "https://v2.exercisedb.io/image/FvF2L2EQXKomrL",
    "id": "1377",
    "name": "calf stretch with hands against wall",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings"
    ],
    "instructions": [
      "Stand facing a wall with your feet hip-width apart.",
      "Place your hands against the wall at shoulder height.",
      "Step your right foot back, keeping your heel on the ground and your leg straight.",
      "Bend your left knee and lean forward, keeping your back leg straight and your heel on the ground.",
      "Hold the stretch for 20-30 seconds.",
      "Switch legs and repeat the stretch."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "rope",
    "gifUrl": "https://v2.exercisedb.io/image/h-qm8YlRP08cdo",
    "id": "1378",
    "name": "calf stretch with rope",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings"
    ],
    "instructions": [
      "Stand facing a wall or sturdy object with your feet hip-width apart.",
      "Hold the ends of the rope in each hand and place the middle of the rope around the ball of your right foot.",
      "Step back with your left foot, keeping your heel on the ground and your leg straight.",
      "Lean forward, keeping your back straight, and gently pull on the rope to stretch your calf.",
      "Hold the stretch for 20-30 seconds, then release.",
      "Repeat on the other leg."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "body weight",
    "gifUrl": "https://v2.exercisedb.io/image/TeHdwMhrpgaR9C",
    "id": "0257",
    "name": "circles knee stretch",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "quadriceps"
    ],
    "instructions": [
      "Stand with your feet shoulder-width apart and your hands on your hips.",
      "Bend your knees slightly and lift your heels off the ground, balancing on the balls of your feet.",
      "Keeping your knees bent, rotate your knees in a circular motion, first clockwise and then counterclockwise.",
      "Perform the movement for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "body weight",
    "gifUrl": "https://v2.exercisedb.io/image/remeP8X0zNhizz",
    "id": "0284",
    "name": "donkey calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Stand with your toes on an elevated surface, such as a step or block.",
      "Place your hands on a stable support, such as a wall or railing, for balance.",
      "Raise your heels as high as possible, lifting your body weight onto the balls of your feet.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "dumbbell",
    "gifUrl": "https://v2.exercisedb.io/image/Wkcp70L7aUP35A",
    "id": "1379",
    "name": "dumbbell seated calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings"
    ],
    "instructions": [
      "Sit on a bench or chair with your feet flat on the ground and a dumbbell resting on your thighs.",
      "Place the balls of your feet on a raised surface such as a step or block, with your heels hanging off the edge.",
      "Hold onto the dumbbell for stability.",
      "Raise your heels as high as possible, lifting your body weight onto the balls of your feet.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "dumbbell",
    "gifUrl": "https://v2.exercisedb.io/image/jD-RTAD0PCiLDO",
    "id": "0400",
    "name": "dumbbell seated one leg calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Sit on a bench or chair with your feet flat on the ground and a dumbbell resting on your right thigh.",
      "Extend your left leg straight out in front of you, keeping your foot flexed.",
      "Place the ball of your right foot on an elevated surface, such as a step or weight plate.",
      "Using your calf muscles, raise your right heel as high as possible.",
      "Pause for a moment at the top, then slowly lower your heel back down to the starting position.",
      "Repeat for the desired number of repetitions, then switch legs."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "dumbbell",
    "gifUrl": "https://v2.exercisedb.io/image/Ri78vwAhsDTFgH",
    "id": "1380",
    "name": "dumbbell seated one leg calf raise - hammer grip",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Sit on a bench or chair with your feet flat on the ground and a dumbbell resting on your thighs.",
      "Place one foot on a raised surface, such as a step or block, with your heel hanging off the edge.",
      "Hold the dumbbell with a hammer grip, meaning your palms are facing each other and your fingers are wrapped around the handle.",
      "Keeping your core engaged and your back straight, slowly raise your heel as high as possible by pushing through the ball of your foot.",
      "Pause for a moment at the top, then slowly lower your heel back down to the starting position.",
      "Repeat for the desired number of repetitions, then switch to the other leg."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "dumbbell",
    "gifUrl": "https://v2.exercisedb.io/image/NygAXVC0L00Jd-",
    "id": "1381",
    "name": "dumbbell seated one leg calf raise - palm up",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Sit on a bench or chair with your back straight and your feet flat on the ground.",
      "Hold a dumbbell in one hand and place it on top of your thigh, palm facing up.",
      "Lift one leg off the ground and extend it in front of you, keeping your knee slightly bent.",
      "Raise your heel as high as possible by pushing through the ball of your foot.",
      "Pause for a moment at the top, then slowly lower your heel back down.",
      "Repeat for the desired number of repetitions, then switch legs and repeat."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "dumbbell",
    "gifUrl": "https://v2.exercisedb.io/image/d57jIwpAqNPBBF",
    "id": "0409",
    "name": "dumbbell single leg calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "ankles"
    ],
    "instructions": [
      "Stand on the edge of a step or platform with your heels hanging off and your toes on the step.",
      "Hold a dumbbell in one hand and place your other hand on a wall or railing for support.",
      "Raise your heel as high as possible, lifting your body up onto your toes.",
      "Pause for a moment at the top, then slowly lower your heel back down below the step.",
      "Repeat for the desired number of repetitions, then switch to the other leg."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "dumbbell",
    "gifUrl": "https://v2.exercisedb.io/image/Ts5u1q-LgqhlEy",
    "id": "0417",
    "name": "dumbbell standing calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "ankles"
    ],
    "instructions": [
      "Stand with your feet shoulder-width apart, holding a dumbbell in each hand.",
      "Raise your heels off the ground as high as possible, using your calves.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "dumbbell",
    "gifUrl": "https://v2.exercisedb.io/image/42E8TsGENm5dV5",
    "id": "1382",
    "name": "exercise ball on the wall calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "quadriceps"
    ],
    "instructions": [
      "Stand with your back against a wall and place an exercise ball between your lower back and the wall.",
      "Position your feet shoulder-width apart, with your toes pointing forward.",
      "Hold a dumbbell in each hand, with your arms extended by your sides.",
      "Raise your heels off the ground, lifting your body weight onto the balls of your feet.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "dumbbell",
    "gifUrl": "https://v2.exercisedb.io/image/gPAwxCjlG7sXQ-",
    "id": "3241",
    "name": "exercise ball on the wall calf raise (tennis ball between ankles)",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "quadriceps"
    ],
    "instructions": [
      "Stand facing a wall with your feet shoulder-width apart.",
      "Place an exercise ball between the wall and your lower back.",
      "Hold a dumbbell in each hand, with your arms extended by your sides.",
      "Place a tennis ball between your ankles.",
      "Raise your heels off the ground, lifting your body up onto your toes.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "dumbbell",
    "gifUrl": "https://v2.exercisedb.io/image/eiuTYDyPJvVLPP",
    "id": "3240",
    "name": "exercise ball on the wall calf raise (tennis ball between knees)",
    "target": "calves",
    "secondaryMuscles": [
      "quadriceps",
      "hamstrings"
    ],
    "instructions": [
      "Stand with your back against a wall and place an exercise ball between your lower back and the wall.",
      "Position your feet shoulder-width apart and slightly in front of you.",
      "Hold a dumbbell in each hand, with your arms extended by your sides.",
      "Place a tennis ball between your knees.",
      "Raise your heels off the ground, lifting your body up onto your toes.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "sled machine",
    "gifUrl": "https://v2.exercisedb.io/image/YyXY-HlB--RxLU",
    "id": "1383",
    "name": "hack calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Adjust the sled machine to a comfortable weight.",
      "Stand on the sled machine with your toes on the platform and your heels hanging off.",
      "Hold onto the handles for stability.",
      "Raise your heels as high as possible by pushing through the balls of your feet.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "sled machine",
    "gifUrl": "https://v2.exercisedb.io/image/9NFhbzOdt4s-PV",
    "id": "1384",
    "name": "hack one leg calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Adjust the sled machine to an appropriate weight.",
      "Stand on the sled machine with one foot, keeping the other foot off the ground.",
      "Hold onto the handles for stability.",
      "Raise your heel as high as possible, lifting your body up on the ball of your foot.",
      "Pause for a moment at the top, then slowly lower your heel back down to the starting position.",
      "Repeat for the desired number of repetitions.",
      "Switch legs and repeat the exercise."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "leverage machine",
    "gifUrl": "https://v2.exercisedb.io/image/Hqj-todmI2pcnf",
    "id": "2289",
    "name": "lever calf press",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings"
    ],
    "instructions": [
      "Adjust the seat of the leverage machine so that your shoulders are aligned with the lever pad.",
      "Place your toes on the lever pad, with your heels hanging off the edge.",
      "Grasp the handles or side supports for stability.",
      "Push the lever pad down by extending your ankles, contracting your calf muscles.",
      "Pause for a moment at the bottom of the movement.",
      "Slowly return to the starting position by allowing your heels to rise back up.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "leverage machine",
    "gifUrl": "https://v2.exercisedb.io/image/yBRdbGerCAYk70",
    "id": "1253",
    "name": "lever donkey calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Adjust the leverage machine to the appropriate height for your body.",
      "Position yourself facing the machine, with your toes on the foot platform and your heels hanging off the edge.",
      "Place your hands on the handles or the support bars for stability.",
      "Engage your calves and lift your heels as high as possible, using the balls of your feet.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "leverage machine",
    "gifUrl": "https://v2.exercisedb.io/image/wOYit1DDGxaCMd",
    "id": "2315",
    "name": "lever rotary calf",
    "target": "calves",
    "secondaryMuscles": [
      "soleus",
      "ankle stabilizers"
    ],
    "instructions": [
      "Adjust the seat height so that your knees are slightly bent and your feet are flat on the footplate.",
      "Place your toes on the footplate, with your heels hanging off the edge.",
      "Grasp the handles or the sides of the machine for stability.",
      "Push through the balls of your feet, raising your heels as high as possible.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "leverage machine",
    "gifUrl": "https://v2.exercisedb.io/image/-ljgt-ng5a7Dmd",
    "id": "2335",
    "name": "lever seated calf press",
    "target": "calves",
    "secondaryMuscles": [
      "soleus",
      "hamstrings"
    ],
    "instructions": [
      "Adjust the seat of the machine so that your shoulders are aligned with the lever pad.",
      "Place your toes on the lower portion of the platform and position your knees under the lever pad.",
      "Grasp the handles on the sides of the seat for stability.",
      "Press the lever pad down by extending your ankles, lifting your heels as high as possible.",
      "Pause for a moment at the top of the movement, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "leverage machine",
    "gifUrl": "https://v2.exercisedb.io/image/KXYxaDIP6XS3zt",
    "id": "0594",
    "name": "lever seated calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "soleus",
      "ankle stabilizers"
    ],
    "instructions": [
      "Adjust the seat height so that your knees are slightly bent and your feet are flat on the footplate.",
      "Place your toes on the footplate with your heels hanging off the edge.",
      "Grasp the handles or the sides of the seat for stability.",
      "Push through the balls of your feet to raise your heels as high as possible.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "leverage machine",
    "gifUrl": "https://v2.exercisedb.io/image/21aXA83scqmdeq",
    "id": "1385",
    "name": "lever seated squat calf raise on leg press machine",
    "target": "calves",
    "secondaryMuscles": [
      "quadriceps",
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Adjust the seat of the leg press machine so that your knees are slightly bent when your feet are on the footplate.",
      "Sit on the machine with your back against the backrest and your feet flat on the footplate, shoulder-width apart.",
      "Place your toes and the balls of your feet on the footplate, keeping your heels off the edge.",
      "Release the safety handles and push the footplate away from you by extending your knees.",
      "Once your knees are fully extended, slowly lower your heels by flexing your calves.",
      "Pause for a moment at the bottom, then push the footplate back up by extending your calves.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "leverage machine",
    "gifUrl": "https://v2.exercisedb.io/image/Y2BZ3EAMQ4PYes",
    "id": "0605",
    "name": "lever standing calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "soleus",
      "ankle stabilizers"
    ],
    "instructions": [
      "Adjust the machine to your height and stand with your feet shoulder-width apart.",
      "Place your shoulders under the pads and hold onto the handles for stability.",
      "Raise your heels as high as possible by extending your ankles.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "body weight",
    "gifUrl": "https://v2.exercisedb.io/image/jed9srq5NtATt6",
    "id": "1386",
    "name": "one leg donkey calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Stand with your feet shoulder-width apart, toes pointing forward.",
      "Place your hands on a stable surface for support, such as a wall or a bar.",
      "Lift one leg off the ground, keeping your knee slightly bent.",
      "Raise your heel as high as possible, using your calf muscles.",
      "Pause for a moment at the top, then slowly lower your heel back down.",
      "Repeat for the desired number of repetitions, then switch legs."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "body weight",
    "gifUrl": "https://v2.exercisedb.io/image/UJy32PkPcMJmN8",
    "id": "1387",
    "name": "one leg floor calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "ankles",
      "feet"
    ],
    "instructions": [
      "Stand with your feet hip-width apart and place your hands on a wall or sturdy object for balance.",
      "Lift one foot off the ground and balance on the other foot.",
      "Slowly raise your heel off the ground, lifting your body up onto the ball of your foot.",
      "Pause for a moment at the top, then slowly lower your heel back down to the starting position.",
      "Repeat for the desired number of repetitions, then switch legs and repeat."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "rope",
    "gifUrl": "https://v2.exercisedb.io/image/8rCSqZPxOKqbjw",
    "id": "1388",
    "name": "peroneals stretch",
    "target": "calves",
    "secondaryMuscles": [
      "ankles",
      "feet"
    ],
    "instructions": [
      "Sit on the ground with your legs extended in front of you.",
      "Loop the rope around the ball of your foot and hold the ends of the rope with your hands.",
      "Gently pull the rope towards you, flexing your foot and stretching your calf muscles.",
      "Hold the stretch for 15-30 seconds.",
      "Release the tension on the rope and repeat the stretch on the other leg.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "rope",
    "gifUrl": "https://v2.exercisedb.io/image/5eYt0s0Fs4soCe",
    "id": "1389",
    "name": "posterior tibialis stretch",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "quadriceps"
    ],
    "instructions": [
      "Sit on the ground with your legs extended in front of you.",
      "Loop the rope around the ball of your foot and hold the ends of the rope with your hands.",
      "Gently pull the rope towards you, flexing your foot and stretching your calf muscles.",
      "Hold the stretch for 20-30 seconds.",
      "Release the tension on the rope and relax your foot.",
      "Repeat the stretch on the other leg."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "body weight",
    "gifUrl": "https://v2.exercisedb.io/image/GAnHEQdJ6nPJSx",
    "id": "1390",
    "name": "seated calf stretch (male)",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings"
    ],
    "instructions": [
      "Sit on the edge of a chair or bench with your feet flat on the ground.",
      "Extend one leg straight out in front of you, keeping your heel on the ground.",
      "Lean forward slightly, feeling a stretch in your calf muscle.",
      "Hold the stretch for 20-30 seconds.",
      "Switch legs and repeat the stretch."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "dumbbell",
    "gifUrl": "https://v2.exercisedb.io/image/nGXvBHs-oRqxr1",
    "id": "0727",
    "name": "single leg calf raise (on a dumbbell)",
    "target": "calves",
    "secondaryMuscles": [
      "ankles",
      "feet"
    ],
    "instructions": [
      "Stand with your feet hip-width apart and hold a dumbbell in one hand.",
      "Lift one foot off the ground and balance on the other foot.",
      "Slowly raise your heel as high as possible, using your calf muscles.",
      "Pause for a moment at the top, then slowly lower your heel back down.",
      "Repeat for the desired number of repetitions, then switch to the other leg."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "sled machine",
    "gifUrl": "https://v2.exercisedb.io/image/aJ3Eii3J4rliWD",
    "id": "0738",
    "name": "sled 45в° calf press",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings"
    ],
    "instructions": [
      "Adjust the sled machine to a 45-degree angle.",
      "Place your feet on the sled platform with your toes pointing forward.",
      "Push the sled platform away from you by extending your ankles and calves.",
      "Pause for a moment at the top, then slowly lower the sled platform back to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "sled machine",
    "gifUrl": "https://v2.exercisedb.io/image/PLZ0UROOtg--Hz",
    "id": "1391",
    "name": "sled calf press on leg press",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "quadriceps"
    ],
    "instructions": [
      "Adjust the seat of the leg press machine so that your knees are slightly bent when your feet are on the sled.",
      "Place your feet shoulder-width apart on the sled, with your toes pointing forward.",
      "Release the safety handles and push the sled away from you by extending your knees and ankles.",
      "Pause for a moment at the top of the movement, then slowly lower the sled back down by bending your knees and ankles.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "sled machine",
    "gifUrl": "https://v2.exercisedb.io/image/MK5DKX5gn-PlHy",
    "id": "0742",
    "name": "sled forward angled calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Adjust the sled machine to a comfortable weight and position yourself on the machine with your toes on the platform and your heels hanging off.",
      "Place your hands on the handles or the sides of the machine for support.",
      "Engage your calves and slowly raise your heels as high as possible, pushing against the resistance of the sled.",
      "Pause for a moment at the top of the movement, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "sled machine",
    "gifUrl": "https://v2.exercisedb.io/image/otEK8C6MXU4Mj7",
    "id": "2334",
    "name": "sled lying calf press",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Adjust the sled machine to a comfortable weight.",
      "Sit on the sled machine with your back against the pad and your feet on the platform.",
      "Place your toes and the balls of your feet on the edge of the platform, with your heels hanging off.",
      "Push the platform away from you by extending your ankles, keeping your knees slightly bent.",
      "Continue pushing until your calves are fully contracted.",
      "Hold the contraction for a moment, then slowly lower the platform back to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "sled machine",
    "gifUrl": "https://v2.exercisedb.io/image/A-T03OvOy9MO7u",
    "id": "1392",
    "name": "sled one leg calf press on leg press",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Adjust the seat of the leg press machine so that your knees are slightly bent when your feet are on the sled.",
      "Sit on the machine with your back against the backrest and your feet on the sled, shoulder-width apart.",
      "Place your toes and the balls of your feet on the sled, keeping your heels off.",
      "Push the sled forward by extending your ankles, keeping your knees slightly bent.",
      "Pause for a moment at the top, then slowly lower the sled back down by flexing your ankles.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "smith machine",
    "gifUrl": "https://v2.exercisedb.io/image/NoMUqCHyvegrla",
    "id": "1393",
    "name": "smith one leg floor calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Position yourself on the floor under the smith machine bar, facing away from the machine.",
      "Place the balls of your feet on a raised surface, such as a weight plate or block.",
      "Position the smith machine bar across your lower legs, just above your ankles.",
      "Hold onto the bar with your hands for stability.",
      "Raise your heels off the ground by extending your ankles, lifting your body up.",
      "Pause at the top of the movement, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "smith machine",
    "gifUrl": "https://v2.exercisedb.io/image/3rVr9KPJjYY-Cg",
    "id": "0763",
    "name": "smith reverse calf raises",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings"
    ],
    "instructions": [
      "Adjust the smith machine bar to a height just below your shoulders.",
      "Stand facing the bar with your feet hip-width apart and toes pointing forward.",
      "Place the balls of your feet on the edge of a step or platform, with your heels hanging off.",
      "Hold onto the bar for support, keeping your back straight and core engaged.",
      "Raise your heels as high as possible, lifting your body weight onto the balls of your feet.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "smith machine",
    "gifUrl": "https://v2.exercisedb.io/image/ujPb517T15d8tH",
    "id": "1394",
    "name": "smith reverse calf raises",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings"
    ],
    "instructions": [
      "Adjust the smith machine bar to a height just below your shoulders.",
      "Stand facing the bar with your feet hip-width apart and toes pointing forward.",
      "Place the balls of your feet on the edge of a step or platform, with your heels hanging off.",
      "Hold onto the bar for support.",
      "Raise your heels as high as possible, lifting your body up onto your toes.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "smith machine",
    "gifUrl": "https://v2.exercisedb.io/image/UJ8n4AyhDj2bHy",
    "id": "1395",
    "name": "smith seated one leg calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings"
    ],
    "instructions": [
      "Sit on the machine with your back against the pad and your feet on the footrest.",
      "Place one leg on the footrest and keep the other leg off the footrest.",
      "Using your calf muscles, raise your heel as high as possible.",
      "Pause for a moment at the top, then slowly lower your heel back down to the starting position.",
      "Repeat for the desired number of repetitions, then switch legs and repeat."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "smith machine",
    "gifUrl": "https://v2.exercisedb.io/image/JdhIhyzCT9vKg2",
    "id": "0773",
    "name": "smith standing leg calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Adjust the smith machine bar to a height that allows you to stand with your feet flat on the ground and your shoulders under the bar.",
      "Position yourself under the bar with your feet shoulder-width apart and your toes pointing forward.",
      "Place your hands on the bar for stability.",
      "Engage your calves and slowly raise your heels off the ground, lifting your body up onto your toes.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "smith machine",
    "gifUrl": "https://v2.exercisedb.io/image/dDQTXp2tOWuxwo",
    "id": "1396",
    "name": "smith toe raise",
    "target": "calves",
    "secondaryMuscles": [
      "ankles",
      "shins"
    ],
    "instructions": [
      "Adjust the smith machine bar to a height that allows you to comfortably stand with your feet flat on the ground.",
      "Position yourself under the bar with your shoulders directly below it and your feet shoulder-width apart.",
      "Place the balls of your feet on a raised platform or weight plates, with your heels hanging off the edge.",
      "Grasp the bar with an overhand grip, slightly wider than shoulder-width apart.",
      "Engage your core and keep your back straight throughout the exercise.",
      "Slowly raise your heels as high as possible, lifting your body weight onto the balls of your feet.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "body weight",
    "gifUrl": "https://v2.exercisedb.io/image/JtGEsniUbmMaq1",
    "id": "1490",
    "name": "standing calf raise (on a staircase)",
    "target": "calves",
    "secondaryMuscles": [
      "ankles",
      "feet"
    ],
    "instructions": [
      "Stand on the edge of a step or a sturdy platform with your heels hanging off and your toes on the step.",
      "Hold onto a railing or wall for balance if needed.",
      "Slowly raise your heels as high as possible, lifting your body weight onto the balls of your feet.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "body weight",
    "gifUrl": "https://v2.exercisedb.io/image/iY8CU3jdKo3vYP",
    "id": "1397",
    "name": "standing calves",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Stand with your feet shoulder-width apart, toes pointing forward.",
      "Raise your heels off the ground as high as possible, standing on your toes.",
      "Hold the position for a moment, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "body weight",
    "gifUrl": "https://v2.exercisedb.io/image/iFOoEf5jsEh493",
    "id": "1398",
    "name": "standing calves calf stretch",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Stand facing a wall or sturdy object, about an arm's length away.",
      "Place your hands on the wall or object at shoulder height.",
      "Step back with one foot, keeping your heel flat on the ground.",
      "Bend your front knee slightly and lean forward, keeping your back leg straight.",
      "You should feel a stretch in your calf muscle.",
      "Hold the stretch for 20-30 seconds.",
      "Repeat on the other leg."
    ]
  },
  {
    "bodyPart": "lower legs",
    "equipment": "weighted",
    "gifUrl": "https://v2.exercisedb.io/image/M-4aKOMWGcFP3o",
    "id": "0833",
    "name": "weighted donkey calf raise",
    "target": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "instructions": [
      "Stand on a raised platform with your toes on the edge and your heels hanging off.",
      "Hold onto a stable object for support.",
      "Raise your heels as high as possible by extending your ankles.",
      "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  }
]




const seedRouter = express.Router();
seedRouter.get(
  "/",
  // isAuth,
  // isAdmin,
  async (req: Request, res: Response) => {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    try {
      // Step 1: Open the file directory of images(.gif) to be uploaded
      const folderPath =
        "C:/Users/EMMANUEL/.vscode/python rough work/LowerLegsExercises"; // Change this to the path of your local folder
      const files = fs.readdirSync(folderPath);

      // Step 2: Return a list of the images to be uploaded
      const imageList: string[] = files.filter((file) => file.endsWith(".gif"));
      console.log(imageList);
      // Step 3: Create the variable of list of objects with "id"
      // Assuming objects with IDs are provided in req.body.objectsWithIds

      // Step 4: Match the object id to respective `image.gif name and append file directory as image_path
      const objectsWithImagePaths = objectsWithIds.map((obj) => {
        const id = obj.id;
        const gifUrl = obj.gifUrl;
        const bodyPart = obj.bodyPart;
        const equipment = obj.equipment;
        const name = obj.name;
        const target = obj.target;
        const secondaryMuscles = obj.secondaryMuscles;
        const instructions = obj.instructions;

        const matchingImage = imageList.find((image) => image.startsWith(id));
        if (matchingImage) {
          const imagePath = path.join(folderPath, matchingImage);
          return {
            id,
            image_path: imagePath,
            bodyPart,
            equipment,
            gifUrl,
            name,
            target,
            secondaryMuscles,
            instructions,
          };
        } else {
          console.error(`Error: Image file for ID ${id} not found.`);
          return { id };
        }
      });

      // Step 5: From the final list of objects with respective image path, loop through each object and upload image path to Cloudinary
      for (const obj of objectsWithImagePaths) {
        if (obj.image_path) {
          console.log(`Uploading ${obj.image_path} to Cloudinary...`);
          const result = await cloudinary.v2.uploader.upload(obj.image_path, {
            folder: "Exercise Gif",
          });
          console.log(
            `Uploaded to Cloudinary. URL: ${result.secure_url}, ${result.id}`
          );

          // Step 6: Append the returned Cloudinary URL to the object as "gifUrl"
          obj.gifUrl = result.secure_url;
          delete (obj as { image_path?: string }).image_path;
        }
      }

      // Step 7: Return list of objects
      res.json(objectsWithImagePaths);

      // Step 8: Write the returned list of objects to a JSX file
      const jsxFilePath = path.join(__dirname, "output.jsx");
      const jsxContent = `const data = ${JSON.stringify(objectsWithImagePaths)}; export default data;`;
      fs.writeFileSync(jsxFilePath, jsxContent);
      console.log(`Data written to ${jsxFilePath}`);
    } catch (err: any) {
      console.error("Error:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

export default seedRouter;
