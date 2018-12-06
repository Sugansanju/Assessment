<template>
    <b-container>
        <b-row v-for="(q, index) in questions" v-bind:key="index">
            <b-col>
                <b-container>
                    <b-row>
                      {{q.questionNumber}})&nbsp;<div v-html="q.question"></div>
                    </b-row>
                    <b-row  v-for="(a, aindex) in q.answers" v-bind:key="aindex">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" :value="a.answerNumber" /> &nbsp;&nbsp;&nbsp;<div v-html="a.answer"></div>
                    </b-row>
                </b-container>
            </b-col>
        </b-row>
    </b-container>
</template>
<style scoped>

</style>

<script>
export default {
    data(){
        return{
  questions :[
  {
    "question": "A and B travel the same distance at the speeds of 10 kmph and 15 kmph respectively.  If A takes 30 minutes longer than B then distance travelled is",
    "questionNumber": "Q.1",
    "answers": [
      {
        "answer": "15 km\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "20km",
        "answerNumber": "b"
      },
      {
        "answer": "90km\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "30km",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "15 km\t\t\t",
      "answerNumber": "a"
    }
  },
  {
    "question": "A monochromatic light of wavelength 589 nm is incident on a water surface having refractive index 1.33.  Find the velocity of light in water.",
    "questionNumber": "Q.2",
    "answers": [
      {
        "answer": "3*108 ms-1\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "332 ms-1",
        "answerNumber": "b"
      },
      {
        "answer": "280 ms-1\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "2.25*108 ms-1",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "2.25*108 ms-1",
      "answerNumber": "d"
    }
  },
  {
    "question": "Which is known as “Sundew Plant”?",
    "questionNumber": "Q.3",
    "answers": [
      {
        "answer": "Cuscuta\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Drosera",
        "answerNumber": "b"
      },
      {
        "answer": "Vanda\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Viscum",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Drosera",
      "answerNumber": "b"
    }
  },
  {
    "question": "If 1/8 of a pencil is black, ½ of the remaining is white and the remaining 3 ½ cm is blue find the total length of the pencil.",
    "questionNumber": "Q.4",
    "answers": [
      {
        "answer": "9cms\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "7cms",
        "answerNumber": "b"
      },
      {
        "answer": "8cms\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "10cms",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "8cms\t\t\t",
      "answerNumber": "c"
    }
  },
  {
    "question": "The Parliament of India consist of",
    "questionNumber": "Q.5",
    "answers": [
      {
        "answer": "One house\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Two houses",
        "answerNumber": "b"
      },
      {
        "answer": "Three houses\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Four houses",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Two houses",
      "answerNumber": "b"
    }
  },
  {
    "question": "The elements like silicon, tellurium and germanium can be purified by",
    "questionNumber": "Q.6",
    "answers": [
      {
        "answer": "Electrolytic refining",
        "answerNumber": "a"
      },
      {
        "answer": "Mond’s process",
        "answerNumber": "b"
      },
      {
        "answer": "Zone refining",
        "answerNumber": "c"
      },
      {
        "answer": "Pattinson’s process",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Zone refining",
      "answerNumber": "c"
    }
  },
  {
    "question": "Bacterial diseases syphilis is caused by",
    "questionNumber": "Q.7",
    "answers": [
      {
        "answer": "Vibrio cholerae\t",
        "answerNumber": "a"
      },
      {
        "answer": "Treponema palladium",
        "answerNumber": "b"
      },
      {
        "answer": "Neisseria gonorrhea",
        "answerNumber": "c"
      },
      {
        "answer": "Yersinia pestis",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Treponema palladium",
      "answerNumber": "b"
    }
  },
  {
    "question": "Theory that explains the location of industry.",
    "questionNumber": "Q.8",
    "answers": [
      {
        "answer": "Weber’s Theory\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Christaller Theory",
        "answerNumber": "b"
      },
      {
        "answer": "Vonthunan Theory",
        "answerNumber": "c"
      },
      {
        "answer": "Malthus Theory",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Weber’s Theory\t\t",
      "answerNumber": "a"
    }
  },
  {
    "question": "Dimensions of momentum are",
    "questionNumber": "Q.9",
    "answers": [
      {
        "answer": "ML-2T\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "MLT-1",
        "answerNumber": "b"
      },
      {
        "answer": "ML2 T-2\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "ML2 T-1",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "MLT-1",
      "answerNumber": "b"
    }
  },
  {
    "question": "The hormone responsible for the process of parturition",
    "questionNumber": "Q.10",
    "answers": [
      {
        "answer": "Thyroxine\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Oxytocin",
        "answerNumber": "b"
      },
      {
        "answer": "Secretin\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Vasopressin",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Oxytocin",
      "answerNumber": "b"
    }
  },
  {
    "question": "The blue colour in Borax Bead test is due to the presence of",
    "questionNumber": "Q.11",
    "answers": [
      {
        "answer": "Iron\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Nickel",
        "answerNumber": "b"
      },
      {
        "answer": "Cobalt\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Zinc",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Cobalt\t\t\t",
      "answerNumber": "c"
    }
  },
  {
    "question": "The programme associated with ‘Food for Work’ is",
    "questionNumber": "Q.12",
    "answers": [
      {
        "answer": "Antyodaya Anna Yojana",
        "answerNumber": "a"
      },
      {
        "answer": "Annapurna Scheme",
        "answerNumber": "b"
      },
      {
        "answer": "Save grain campaign ",
        "answerNumber": "c"
      },
      {
        "answer": "SampoprnaGraminRozgarYojana",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "SampoprnaGraminRozgarYojana",
      "answerNumber": "d"
    }
  },
  {
    "question": "If the range of a function is a singleton set, then it is ",
    "questionNumber": "Q.13",
    "answers": [
      {
        "answer": " constant function ",
        "answerNumber": "a"
      },
      {
        "answer": "an identity function",
        "answerNumber": "b"
      },
      {
        "answer": "objective function ",
        "answerNumber": "c"
      },
      {
        "answer": "an one-one function",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": " constant function ",
      "answerNumber": "a"
    }
  },
  {
    "question": "A solid having six equal square faces is called a ",
    "questionNumber": "Q.14",
    "answers": [
      {
        "answer": "cube\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "cuboid",
        "answerNumber": "b"
      },
      {
        "answer": "square\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "rectangle",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "cube\t\t\t",
      "answerNumber": "a"
    }
  },
  {
    "question": "Match the compounds with correct oxidation number of the underlined:\u003cbr\u003e\u003ctable border\u003d\"1px\"\u003e\u003ctr\u003e\u003ctd\u003e\u003c/td\u003e\u003ctd\u003eCompounds\u003c/td\u003e\u003ctd\u003eOxidation number\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003eA)\u003c/td\u003e\u003ctd\u003eCrO2 Cl2\u003c/td\u003e\u003ctd\u003e1.\u003c/td\u003e\u003ctd\u003e+ 7\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003eB)\u003c/td\u003e\u003ctd\u003eMnO3Cl\u003c/td\u003e\u003ctd\u003e2.\u003c/td\u003e\u003ctd\u003e+ 2\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003eC)\u003c/td\u003e\u003ctd\u003eNH2OH\u003c/td\u003e\u003ctd\u003e3.\u003c/td\u003e\u003ctd\u003e- 1\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003eD)\u003c/td\u003e\u003ctd\u003eOF2\u003c/td\u003e\u003ctd\u003e4.\u003c/td\u003e\u003ctd\u003e+ 6\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003e\u003c/td\u003e\u003ctd\u003eA)\u003c/td\u003e\u003ctd\u003eB)\u003c/td\u003e\u003ctd\u003eC)\u003c/td\u003e\u003ctd\u003eD)\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003ea)\u003c/td\u003e\u003ctd\u003e4\u003c/td\u003e\u003ctd\u003e1\u003c/td\u003e\u003ctd\u003e2\u003c/td\u003e\u003ctd\u003e3\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003e*b)\u003c/td\u003e\u003ctd\u003e4\u003c/td\u003e\u003ctd\u003e1\u003c/td\u003e\u003ctd\u003e3\u003c/td\u003e\u003ctd\u003e2\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003ec)\u003c/td\u003e\u003ctd\u003e1\u003c/td\u003e\u003ctd\u003e3\u003c/td\u003e\u003ctd\u003e2\u003c/td\u003e\u003ctd\u003e4\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003ed)\u003c/td\u003e\u003ctd\u003e2\u003c/td\u003e\u003ctd\u003e4\u003c/td\u003e\u003ctd\u003e1\u003c/td\u003e\u003ctd\u003e3\u003c/td\u003e\u003c/tr\u003e\u003c/table\u003e",
    "questionNumber": "Q.15",
    "answers": []
  },
  {
    "question": "Why tungsten is used in Bulbs?",
    "questionNumber": "Q.16",
    "answers": [
      {
        "answer": "Natural Source of Light ",
        "answerNumber": "a"
      },
      {
        "answer": "Easy to Bend",
        "answerNumber": "b"
      },
      {
        "answer": "Melting point is high ",
        "answerNumber": "c"
      },
      {
        "answer": "It absorbs heat",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Melting point is high ",
      "answerNumber": "c"
    }
  },
  {
    "question": "Which of the following is/are corect?\u003cbr\u003eI. Conjugate acid of NH3 is NH2\u003cbr\u003eII. Conjugate base of HN3 is N3\u003cbr\u003eIII. HCO-3 can act both Bronsted acid and Bronsted base",
    "questionNumber": "Q.17",
    "answers": [
      {
        "answer": "I and II\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "II and III",
        "answerNumber": "b"
      },
      {
        "answer": "I and III \t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "I, II and III",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "II and III",
      "answerNumber": "b"
    }
  },
  {
    "question": "Identify the most suitable biofertilizer for casuarina cultivation",
    "questionNumber": "Q.18",
    "answers": [
      {
        "answer": "Rhizobium \t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Frankia",
        "answerNumber": "b"
      },
      {
        "answer": "Azolla",
        "answerNumber": "c"
      },
      {
        "answer": "Azospirillum",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Frankia",
      "answerNumber": "b"
    }
  },
  {
    "question": "Simplify: \u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmsqrt\u003e\u003cmtext\u003e48\u003c/mtext\u003e\u003c/msqrt\u003e\u003cmo\u003e−\u003c/mo\u003e\u003cmn\u003e3\u003c/mn\u003e\u003cmsqrt\u003e\u003cmtext\u003e72\u003c/mtext\u003e\u003c/msqrt\u003e\u003cmo\u003e−\u003c/mo\u003e\u003cmsqrt\u003e\u003cmtext\u003e27\u003c/mtext\u003e\u003c/msqrt\u003e\u003cmo\u003e+\u003c/mo\u003e\u003cmn\u003e5\u003c/mn\u003e\u003cmsqrt\u003e\u003cmtext\u003e18\u003c/mtext\u003e\u003c/msqrt\u003e\u003c/math\u003e\u003cbr\u003e",
    "questionNumber": "Q.19",
    "answers": [
      {
        "answer": "\t\t\t\u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmsqrt\u003e\u003cmn\u003e2\u003c/mn\u003e\u003c/msqrt\u003e\u003cmo\u003e+\u003c/mo\u003e\u003cmsqrt\u003e\u003cmn\u003e3\u003c/mn\u003e\u003c/msqrt\u003e\u003c/math\u003e\u003cbr\u003e",
        "answerNumber": "a"
      },
      {
        "answer": "\u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmsqrt\u003e\u003cmn\u003e2\u003c/mn\u003e\u003c/msqrt\u003e\u003cmo\u003e−\u003c/mo\u003e\u003cmsqrt\u003e\u003cmn\u003e3\u003c/mn\u003e\u003c/msqrt\u003e\u003c/math\u003e\u003cbr\u003e",
        "answerNumber": "b"
      },
      {
        "answer": "\t\u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmo\u003e−\u003c/mo\u003e\u003cmsqrt\u003e\u003cmn\u003e2\u003c/mn\u003e\u003c/msqrt\u003e\u003cmo\u003e+\u003c/mo\u003e\u003cmsqrt\u003e\u003cmn\u003e3\u003c/mn\u003e\u003c/msqrt\u003e\u003c/math\u003e\u003cbr\u003e",
        "answerNumber": "c"
      },
      {
        "answer": "none of these",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "none of these",
      "answerNumber": "d"
    }
  },
  {
    "question": "The next Olympic Games is to be held at ___ in 2020.",
    "questionNumber": "Q.20",
    "answers": [
      {
        "answer": "London \t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Singapore",
        "answerNumber": "b"
      },
      {
        "answer": "Tokyo\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Berlin",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Tokyo\t\t\t",
      "answerNumber": "c"
    }
  },
  {
    "question": "Which of the following phenomena is responsible for the production of shadow?",
    "questionNumber": "Q.21",
    "answers": [
      {
        "answer": "Interference of light",
        "answerNumber": "a"
      },
      {
        "answer": "Diffraction of light",
        "answerNumber": "b"
      },
      {
        "answer": "Polarization of light ",
        "answerNumber": "c"
      },
      {
        "answer": "Rectilinear propagation of light",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Polarization of light ",
      "answerNumber": "c"
    }
  },
  {
    "question": "Number of RBC’s in a normal adult man per mm3 of blood is ",
    "questionNumber": "Q.22",
    "answers": [
      {
        "answer": "5,000\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "50,000",
        "answerNumber": "b"
      },
      {
        "answer": "5,00,000\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "50,00,000\t",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "50,00,000\t",
      "answerNumber": "d"
    }
  },
  {
    "question": "Which one of the followings is responsible for the state of fear, tension and rise in blood pressure?",
    "questionNumber": "Q.23",
    "answers": [
      {
        "answer": "Adrenal gland\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Pineal gland",
        "answerNumber": "b"
      },
      {
        "answer": "Parathyroid gland\t",
        "answerNumber": "c"
      },
      {
        "answer": "Thymus gland",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Adrenal gland\t\t",
      "answerNumber": "a"
    }
  },
  {
    "question": "The title ‘Indian Napoleon’ is given to",
    "questionNumber": "Q.24",
    "answers": [
      {
        "answer": "Asoka the Great",
        "answerNumber": "a"
      },
      {
        "answer": "Akbar the Great ",
        "answerNumber": "b"
      },
      {
        "answer": "Samudra Gupta",
        "answerNumber": "c"
      },
      {
        "answer": "Chandra Gupta II",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Samudra Gupta",
      "answerNumber": "c"
    }
  },
  {
    "question": "The value of  is equal to\u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmfrac\u003e\u003cmrow\u003e\u003cmfenced separators\u003d\"|\"\u003e\u003cmrow\u003e\u003cmn\u003e6\u003c/mn\u003e\u003cmo\u003e+\u003c/mo\u003e\u003cmn\u003e6\u003c/mn\u003e\u003cmo\u003e+\u003c/mo\u003e\u003cmn\u003e6\u003c/mn\u003e\u003cmo\u003e+\u003c/mo\u003e\u003cmn\u003e6\u003c/mn\u003e\u003c/mrow\u003e\u003c/mfenced\u003e\u003cmo\u003e÷\u003c/mo\u003e\u003cmn\u003e6\u003c/mn\u003e\u003c/mrow\u003e\u003cmrow\u003e\u003cmn\u003e4\u003c/mn\u003e\u003cmo\u003e+\u003c/mo\u003e\u003cmn\u003e4\u003c/mn\u003e\u003cmo\u003e+\u003c/mo\u003e\u003cmn\u003e4\u003c/mn\u003e\u003cmo\u003e+\u003c/mo\u003e\u003cmn\u003e4\u003c/mn\u003e\u003cmo\u003e÷\u003c/mo\u003e\u003cmn\u003e4\u003c/mn\u003e\u003c/mrow\u003e\u003c/mfrac\u003e\u003c/math\u003e\u003cbr\u003e",
    "questionNumber": "Q.25",
    "answers": [
      {
        "answer": "\t\t\t\u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmfrac\u003e\u003cmrow\u003e\u003cmn\u003e4\u003c/mn\u003e\u003c/mrow\u003e\u003cmrow\u003e\u003cmtext\u003e13\u003c/mtext\u003e\u003c/mrow\u003e\u003c/mfrac\u003e\u003c/math\u003e\u003cbr\u003e",
        "answerNumber": "a"
      },
      {
        "answer": "\u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmfrac\u003e\u003cmrow\u003e\u003cmn\u003e7\u003c/mn\u003e\u003c/mrow\u003e\u003cmrow\u003e\u003cmn\u003e4\u003c/mn\u003e\u003c/mrow\u003e\u003c/mfrac\u003e\u003c/math\u003e\u003cbr\u003e",
        "answerNumber": "b"
      },
      {
        "answer": "\t\t\t\t\u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmfrac\u003e\u003cmrow\u003e\u003cmtext\u003e12\u003c/mtext\u003e\u003c/mrow\u003e\u003cmrow\u003e\u003cmn\u003e6\u003c/mn\u003e\u003c/mrow\u003e\u003c/mfrac\u003e\u003c/math\u003e\u003cbr\u003e",
        "answerNumber": "c"
      },
      {
        "answer": "1",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "\t\t\t\u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmfrac\u003e\u003cmrow\u003e\u003cmn\u003e4\u003c/mn\u003e\u003c/mrow\u003e\u003cmrow\u003e\u003cmtext\u003e13\u003c/mtext\u003e\u003c/mrow\u003e\u003c/mfrac\u003e\u003c/math\u003e\u003cbr\u003e",
      "answerNumber": "a"
    }
  },
  {
    "question": "Polymerising methyl acrylate in presence of polychlorostyrene yields",
    "questionNumber": "Q.26",
    "answers": [
      {
        "answer": "Chelate polymers \t",
        "answerNumber": "a"
      },
      {
        "answer": "Graft polymer",
        "answerNumber": "b"
      },
      {
        "answer": "Coordination polymers ",
        "answerNumber": "c"
      },
      {
        "answer": "Branched polymers",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Graft polymer",
      "answerNumber": "b"
    }
  },
  {
    "question": "Who wrote the book the ‘Glimpses of world History’?",
    "questionNumber": "Q.27",
    "answers": [
      {
        "answer": "Sarojini Naidu\t",
        "answerNumber": "a"
      },
      {
        "answer": "Mahatma Gandhi",
        "answerNumber": "b"
      },
      {
        "answer": "Subhash Chandra Bose\t",
        "answerNumber": "c"
      },
      {
        "answer": "Jawaharlal Nehru",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Jawaharlal Nehru",
      "answerNumber": "d"
    }
  },
  {
    "question": "The difference between the length and breadth of a rectangle is 23m. If its perimeter is 206 m then its area is",
    "questionNumber": "Q.28",
    "answers": [
      {
        "answer": "1795 m2\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "2520 m2",
        "answerNumber": "b"
      },
      {
        "answer": "2240 m2\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "3250 m2\t",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "2520 m2",
      "answerNumber": "b"
    }
  },
  {
    "question": "The product of L.C.M and H.C.F of two numbers is 24. The difference of two numbers is 2, then the numbers are",
    "questionNumber": "Q.29",
    "answers": [
      {
        "answer": "2 and 4\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "6 and 4",
        "answerNumber": "b"
      },
      {
        "answer": "8 and 6\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "8 and 10",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "6 and 4",
      "answerNumber": "b"
    }
  },
  {
    "question": "Missing term in the series :\t\u003cbr\u003eXYZ, ABC, UVW, DEF, RST, GHI,____",
    "questionNumber": "Q.30",
    "answers": [
      {
        "answer": "UVW\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "JKL",
        "answerNumber": "b"
      },
      {
        "answer": "OPQ\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "NOP",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "OPQ\t\t\t",
      "answerNumber": "c"
    }
  },
  {
    "question": "National Physical Laboratory (NPL) is situated at",
    "questionNumber": "Q.31",
    "answers": [
      {
        "answer": "Chennai\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Calcutta",
        "answerNumber": "b"
      },
      {
        "answer": "Mumbai \t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Delhi",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Delhi",
      "answerNumber": "d"
    }
  },
  {
    "question": "A small metal ball is suspended in a uniform electric field with the help of an insulated thread. If high energy X-ray beam falls on it; ",
    "questionNumber": "Q.32",
    "answers": [
      {
        "answer": "the ball will be deflected in the direction of field",
        "answerNumber": "a"
      },
      {
        "answer": "the ball will be deflected opposite to direction of field",
        "answerNumber": "b"
      },
      {
        "answer": "the ball will not deflect\t",
        "answerNumber": "c"
      },
      {
        "answer": "the ball will fly to infinity",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "the ball will be deflected in the direction of field",
      "answerNumber": "a"
    }
  },
  {
    "question": "An example of natural polymer",
    "questionNumber": "Q.33",
    "answers": [
      {
        "answer": "Nylon\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Rayon ",
        "answerNumber": "b"
      },
      {
        "answer": "Cellulose\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Orion",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Cellulose\t\t",
      "answerNumber": "c"
    }
  },
  {
    "question": "The number of mitochondria increases in the cells of",
    "questionNumber": "Q.34",
    "answers": [
      {
        "answer": "dormant seeds\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "germinating seeds",
        "answerNumber": "b"
      },
      {
        "answer": "dry seeds\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "dead seeds",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "germinating seeds",
      "answerNumber": "b"
    }
  },
  {
    "question": "The Area of a rectangular field is 836 sq.m. One side of the rectangle is 22 m. What is the perimeter of the field?",
    "questionNumber": "Q.35",
    "answers": [
      {
        "answer": "00 m\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "120 m ",
        "answerNumber": "b"
      },
      {
        "answer": "80 m\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "00 m",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "120 m ",
      "answerNumber": "b"
    }
  },
  {
    "question": "The G.C.D. of 36,156 is 12. Find their L.C.M.",
    "questionNumber": "Q.36",
    "answers": [
      {
        "answer": "68\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "12",
        "answerNumber": "b"
      },
      {
        "answer": "12\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "32",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "68\t\t\t",
      "answerNumber": "a"
    }
  },
  {
    "question": "Match List I and List II and select your answers using the codes given below :\u003cbr\u003e\u003ctable border\u003d\"1px\"\u003e\u003ctr\u003e\u003ctd\u003eList I\u003c/td\u003e\u003ctd\u003eList II\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003eA)Father of Revolutionary thoughtB)Punjab KesariC)Father of IndianUnrestD)Desabandhu\u003c/td\u003e\u003ctd\u003e1.BalaGangadaraTilak  2.C.R. Das  3.BipinChandraPal4.LalalajpatRai\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003e\u003c/td\u003e\u003ctd\u003eA)\u003c/td\u003e\u003ctd\u003eB)\u003c/td\u003e\u003ctd\u003eC)\u003c/td\u003e\u003ctd\u003eD)\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003ea)  \u003c/td\u003e\u003ctd\u003e2\u003c/td\u003e\u003ctd\u003e1\u003c/td\u003e\u003ctd\u003e3\u003c/td\u003e\u003ctd\u003e4\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003eb)  \u003c/td\u003e\u003ctd\u003e1\u003c/td\u003e\u003ctd\u003e3\u003c/td\u003e\u003ctd\u003e2\u003c/td\u003e\u003ctd\u003e4\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003e*c)  \u003c/td\u003e\u003ctd\u003e3\u003c/td\u003e\u003ctd\u003e4\u003c/td\u003e\u003ctd\u003e1\u003c/td\u003e\u003ctd\u003e2\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003ed) \u003c/td\u003e\u003ctd\u003e3\u003c/td\u003e\u003ctd\u003e2\u003c/td\u003e\u003ctd\u003e1\u003c/td\u003e\u003ctd\u003e4\u003c/td\u003e\u003c/tr\u003e\u003c/table\u003e",
    "questionNumber": "Q.37",
    "answers": []
  },
  {
    "question": "Who introduced the concept of hot spot in biodiversity?",
    "questionNumber": "Q.38",
    "answers": [
      {
        "answer": "hristopher Columbus",
        "answerNumber": "a"
      },
      {
        "answer": "Norman Myers",
        "answerNumber": "b"
      },
      {
        "answer": "WWF\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Charles Darwin",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Norman Myers",
      "answerNumber": "b"
    }
  },
  {
    "question": "One among the following is monoatomic ",
    "questionNumber": "Q.39",
    "answers": [
      {
        "answer": "Oxygen\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Helium",
        "answerNumber": "b"
      },
      {
        "answer": "Fluorine\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Nitrogen",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Helium",
      "answerNumber": "b"
    }
  },
  {
    "question": "The ratios of the respective heights and the respective radii of two cylinders are 1:2 and 2:1 respectively. Then their respective volumes are in the ratio",
    "questionNumber": "Q.40",
    "answers": [
      {
        "answer": "4:1\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "1:4",
        "answerNumber": "b"
      },
      {
        "answer": "2:1\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "1:2",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "2:1\t\t\t",
      "answerNumber": "c"
    }
  },
  {
    "question": " “Indian poverty and Un-British Rule in India” was written by",
    "questionNumber": "Q.41",
    "answers": [
      {
        "answer": "R.C. Dutt\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "M.G. Ranade",
        "answerNumber": "b"
      },
      {
        "answer": "DadabhaiNaoroji\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "G.V. Joshi",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "DadabhaiNaoroji\t\t",
      "answerNumber": "c"
    }
  },
  {
    "question": "Name the European who followed “Blue water policy” in India",
    "questionNumber": "Q.42",
    "answers": [
      {
        "answer": "Albuquerque\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Dupleix",
        "answerNumber": "b"
      },
      {
        "answer": "Robert Clive \t\t",
        "answerNumber": "c"
      },
      {
        "answer": "e Almeida",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "e Almeida",
      "answerNumber": "d"
    }
  },
  {
    "question": "What is the median of the data 526, 265, 726, 672, 625, 248, 482, 252, 276, 267, 284, 256? ",
    "questionNumber": "Q.43",
    "answers": [
      {
        "answer": "84\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "280",
        "answerNumber": "b"
      },
      {
        "answer": "282\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "278",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "280",
      "answerNumber": "b"
    }
  },
  {
    "question": "Range of first twenty positive integers is",
    "questionNumber": "Q.44",
    "answers": [
      {
        "answer": "0\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "8    ",
        "answerNumber": "b"
      },
      {
        "answer": "19 \t",
        "answerNumber": "c"
      },
      {
        "answer": "1",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "19 \t",
      "answerNumber": "c"
    }
  },
  {
    "question": "In which country did the plane carrying a Brazilian soccer team crash recently?",
    "questionNumber": "Q.45",
    "answers": [
      {
        "answer": "Argentina\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Brazil",
        "answerNumber": "b"
      },
      {
        "answer": "Colombia\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Venezuela",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Colombia\t\t",
      "answerNumber": "c"
    }
  },
  {
    "question": "Match the following:\u003cbr\u003e\u003ctable border\u003d\"1px\"\u003e\u003ctr\u003e\u003ctd\u003eA)\tHighest Civilian AwardB)\tNational Sports AwardC)\tWartime Gallantary AwardD)\tCourage and daring Enterprise Award\u003c/td\u003e\u003ctd\u003e1.Arjuna2.ParamVir chakra3.KalpanaChawla4.Bharat Ratna\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003e\u003c/td\u003e\u003ctd\u003eA)\u003c/td\u003e\u003ctd\u003eB)\u003c/td\u003e\u003ctd\u003eC)\u003c/td\u003e\u003ctd\u003eD)\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003ea)  \u003c/td\u003e\u003ctd\u003e4\u003c/td\u003e\u003ctd\u003e2\u003c/td\u003e\u003ctd\u003e1\u003c/td\u003e\u003ctd\u003e3\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003e*b)  \u003c/td\u003e\u003ctd\u003e4\u003c/td\u003e\u003ctd\u003e1\u003c/td\u003e\u003ctd\u003e2\u003c/td\u003e\u003ctd\u003e3\u003c/td\u003e\u003c/tr\u003e\u003c/table\u003e",
    "questionNumber": "Q.46",
    "answers": [
      {
        "answer": "\t 1       4         3\t         2",
        "answerNumber": "c"
      },
      {
        "answer": " 4       3         2\t         1",
        "answerNumber": "d"
      }
    ]
  },
  {
    "question": "Three cubes of iron whose edges are 6 c.m., 8 c.m., 10 c.m. respectively are melted and formed into a single cube. The edge of the new cube is",
    "questionNumber": "Q.47",
    "answers": [
      {
        "answer": "12 c.m.\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "14 c.m.",
        "answerNumber": "b"
      },
      {
        "answer": "16 c.m.\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "18 c.m.",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "12 c.m.\t\t\t",
      "answerNumber": "a"
    }
  },
  {
    "question": "The value of x in the following diagram is\u003cbr\u003e\u003cimg width\u003d\"100px\" src\u003d\"/static/images/178bfa09-aca9-4519-8bfa-09aca9d51913image1.png\"\u003e",
    "questionNumber": "Q.48",
    "answers": [
      {
        "answer": "192\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "190",
        "answerNumber": "b"
      },
      {
        "answer": "188\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "186",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "190",
      "answerNumber": "b"
    }
  },
  {
    "question": "Find the missing number\u003cbr\u003e\u003cimg width\u003d\"100px\" src\u003d\"/static/images/852c7e36-d3f4-44f3-ac7e-36d3f424f35bimage2.png\"\u003e",
    "questionNumber": "Q.49",
    "answers": [
      {
        "answer": "51\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "57",
        "answerNumber": "b"
      },
      {
        "answer": "58\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "52",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "57",
      "answerNumber": "b"
    }
  },
  {
    "question": "\u003cbr\u003e\u003cimg width\u003d\"100px\" src\u003d\"/static/images/9f92de62-247e-44d8-92de-62247e74d828image3.png\"\u003e",
    "questionNumber": "Q.50",
    "answers": [
      {
        "answer": "\t\t\t\u003cimg width\u003d\"100px\" src\u003d\"/static/images/0ded7186-d0be-4ae3-ad71-86d0be4ae34bimage4.png\"\u003e",
        "answerNumber": "a"
      },
      {
        "answer": "\u003cimg width\u003d\"100px\" src\u003d\"/static/images/614d2f32-9898-42cb-8d2f-32989842cb3cimage5.png\"\u003e",
        "answerNumber": "b"
      },
      {
        "answer": "\t\t\t\u003cimg width\u003d\"100px\" src\u003d\"/static/images/80caae1e-eff2-4426-8aae-1eeff2e42691image6.png\"\u003e",
        "answerNumber": "c"
      },
      {
        "answer": "\u003cimg width\u003d\"100px\" src\u003d\"/static/images/b4840faa-7d3e-42ab-840f-aa7d3e42ab58image7.png\"\u003e",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "\u003cimg width\u003d\"100px\" src\u003d\"/static/images/614d2f32-9898-42cb-8d2f-32989842cb3cimage5.png\"\u003e",
      "answerNumber": "b"
    }
  },
  {
    "question": "A can do a job in 16 days. B is 60% more efficient than A. Find the number of days for B to finish the same work.",
    "questionNumber": "Q.51",
    "answers": [
      {
        "answer": "16\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "12\t",
        "answerNumber": "b"
      },
      {
        "answer": "10\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "15",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "10\t\t\t",
      "answerNumber": "c"
    }
  },
  {
    "question": "Find the odd man out\u003cbr\u003e\u003cimg width\u003d\"100px\" src\u003d\"/static/images/ff17ceb9-ace2-46ed-97ce-b9ace256ed48image8.png\"\u003e",
    "questionNumber": "Q.52",
    "answers": [
      {
        "answer": "iv\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "ii",
        "answerNumber": "b"
      },
      {
        "answer": "iii\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "i",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "iv\t\t\t",
      "answerNumber": "a"
    }
  },
  {
    "question": "Water is flowing at the rate of 15 km/hr through a cylindrical pipe of diameter 14 cm into a rectangular tank which is 50 m long and 44 m wide. In how many hours will the water level in the tank raise by 21 cm? ",
    "questionNumber": "Q.53",
    "answers": [
      {
        "answer": "1 hr \t\t",
        "answerNumber": "a"
      },
      {
        "answer": "2hrs",
        "answerNumber": "b"
      },
      {
        "answer": "1 hrs \t\t\t\u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmfrac\u003e\u003cmrow\u003e\u003cmn\u003e1\u003c/mn\u003e\u003c/mrow\u003e\u003cmrow\u003e\u003cmn\u003e2\u003c/mn\u003e\u003c/mrow\u003e\u003c/mfrac\u003e\u003c/math\u003e\u003cbr\u003e",
        "answerNumber": "c"
      },
      {
        "answer": "3 hrs",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "2hrs",
      "answerNumber": "b"
    }
  },
  {
    "question": "In a public meeting the tube lights are connected in _______ and serial lights areconnected in_______.",
    "questionNumber": "Q.54",
    "answers": [
      {
        "answer": "Parallel and Series \t",
        "answerNumber": "a"
      },
      {
        "answer": "eries and Parallel",
        "answerNumber": "b"
      },
      {
        "answer": "Parallel and Parallel ",
        "answerNumber": "c"
      },
      {
        "answer": "Series and Series",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Parallel and Series \t",
      "answerNumber": "a"
    }
  },
  {
    "question": "Which Indian state to started the country’s first Olive refinery?",
    "questionNumber": "Q.55",
    "answers": [
      {
        "answer": "Bihar \t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Rajasthan",
        "answerNumber": "b"
      },
      {
        "answer": "Delhi \t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Gujarat",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Rajasthan",
      "answerNumber": "b"
    }
  },
  {
    "question": "Choose the correct statement.",
    "questionNumber": "Q.56",
    "answers": [
      {
        "answer": "The lithosphere controls the amount of solar radiation reaching the surface of the earth ",
        "answerNumber": "a"
      },
      {
        "answer": "The hydrosphere controls the amount of solar radiation reaching the surface of the earth",
        "answerNumber": "b"
      },
      {
        "answer": "The atmosphere controls the amount of solar radiation reaching the surface of the earth",
        "answerNumber": "c"
      },
      {
        "answer": "Both lithosphere and hydrosphere controls the\tamount of solar radiation reaching the surface of the earth",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "The lithosphere controls the amount of solar radiation reaching the surface of the earth ",
      "answerNumber": "a"
    }
  },
  {
    "question": "Which of the following are vector quantities?\u003cbr\u003e(i) Density\t\t\t\u003cbr\u003e(ii) Acceleration\u003cbr\u003e(iii) Energy\t\t\t\u003cbr\u003e(iv) Force\t",
    "questionNumber": "Q.57",
    "answers": [
      {
        "answer": "(i) only\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "(i) and (iii)",
        "answerNumber": "b"
      },
      {
        "answer": "(ii) and (iv)\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "(i), (ii) and (iii)",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "(ii) and (iv)\t\t",
      "answerNumber": "c"
    }
  },
  {
    "question": "Megaloblastic anaemia is due to the deficiency of ",
    "questionNumber": "Q.58",
    "answers": [
      {
        "answer": "Folic acid and vitamin B12",
        "answerNumber": "a"
      },
      {
        "answer": "olic acid and vitamin B6",
        "answerNumber": "b"
      },
      {
        "answer": "Ascorbic acid and vitamin B2",
        "answerNumber": "c"
      },
      {
        "answer": "Ascorbic acid and vitamin B6\t",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "olic acid and vitamin B6",
      "answerNumber": "b"
    }
  },
  {
    "question": " ‘β’—cells of Islets of Langerhans secrete ",
    "questionNumber": "Q.59",
    "answers": [
      {
        "answer": "Glucagon\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Insulin",
        "answerNumber": "b"
      },
      {
        "answer": "Somatostatin\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Calcitonin",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Insulin",
      "answerNumber": "b"
    }
  },
  {
    "question": "Charaka and Susruta were prominent",
    "questionNumber": "Q.60",
    "answers": [
      {
        "answer": "Astronomers\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Mathematicians ",
        "answerNumber": "b"
      },
      {
        "answer": "Physicians\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Philosophers",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Physicians\t\t",
      "answerNumber": "c"
    }
  },
  {
    "question": "The most recent Epoch among the following is",
    "questionNumber": "Q.61",
    "answers": [
      {
        "answer": "Pleistocene\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "iocene",
        "answerNumber": "b"
      },
      {
        "answer": "Holocene\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "ocene",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Holocene\t\t",
      "answerNumber": "c"
    }
  },
  {
    "question": "India recorded the highest growth rate, of National Income during\t\t\t",
    "questionNumber": "Q.62",
    "answers": [
      {
        "answer": "I Five Year Plan\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "V Five Year Plan",
        "answerNumber": "b"
      },
      {
        "answer": "VI Five Year Plan\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "VIII Five Year Plan",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "V Five Year Plan",
      "answerNumber": "b"
    }
  },
  {
    "question": "A’s new salary after 15% increase is ` 1932. What is the old salary?",
    "questionNumber": "Q.63",
    "answers": [
      {
        "answer": "1600\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "` 1680",
        "answerNumber": "b"
      },
      {
        "answer": "1700\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": " 1660",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "` 1680",
      "answerNumber": "b"
    }
  },
  {
    "question": "The period of a geostationary artificial satelliteof the earth is",
    "questionNumber": "Q.64",
    "answers": [
      {
        "answer": "Zero\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "2\thours",
        "answerNumber": "b"
      },
      {
        "answer": "24 hours\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "8\thours",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "24 hours\t\t\t",
      "answerNumber": "c"
    }
  },
  {
    "question": "The citric acid produced during Kreb cycle contains",
    "questionNumber": "Q.65",
    "answers": [
      {
        "answer": "Two carboxylic groups\t",
        "answerNumber": "a"
      },
      {
        "answer": "Three carboxylic groups",
        "answerNumber": "b"
      },
      {
        "answer": "Four carboxylic groups\t",
        "answerNumber": "c"
      },
      {
        "answer": "One carboxylic group",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Three carboxylic groups",
      "answerNumber": "b"
    }
  },
  {
    "question": "Which bacteria cause Enteric fever in man?",
    "questionNumber": "Q.66",
    "answers": [
      {
        "answer": "Salmonella\t",
        "answerNumber": "a"
      },
      {
        "answer": "Cornybacteriumdiphtheria",
        "answerNumber": "b"
      },
      {
        "answer": "BordetellaPertusis\t",
        "answerNumber": "c"
      },
      {
        "answer": "TreponemaPallidium",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Salmonella\t",
      "answerNumber": "a"
    }
  },
  {
    "question": "Idiogram refers to",
    "questionNumber": "Q.67",
    "answers": [
      {
        "answer": "Diagrammatic representation of genes",
        "answerNumber": "a"
      },
      {
        "answer": "iagrammatic representation of chromosomes ",
        "answerNumber": "b"
      },
      {
        "answer": "Electroencephalogram",
        "answerNumber": "c"
      },
      {
        "answer": "Electro cardiogram",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "iagrammatic representation of chromosomes ",
      "answerNumber": "b"
    }
  },
  {
    "question": "The city having odd-even scheme to reduce pollution is\t\t",
    "questionNumber": "Q.68",
    "answers": [
      {
        "answer": "Kolkatta\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Delhi",
        "answerNumber": "b"
      },
      {
        "answer": "Mumbai\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Pune",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Delhi",
      "answerNumber": "b"
    }
  },
  {
    "question": "Arrange properly the following stages in an individual life. \u003cbr\u003e1. Sanyasi\t\t\t\u003cbr\u003e2. Grihasta\t\u003cbr\u003e3. Brahmachari\t\t\u003cbr\u003e4. Vanaprastha\t",
    "questionNumber": "Q.69",
    "answers": [
      {
        "answer": "3, 2, 4, 1\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": ", 1, 4, 3",
        "answerNumber": "b"
      },
      {
        "answer": "3, 4, 1, 2\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "2, 1, 3, 4",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "3, 2, 4, 1\t\t\t",
      "answerNumber": "a"
    }
  },
  {
    "question": "Which of the following items come under the concurrent list of Indian Constitution?",
    "questionNumber": "Q.70",
    "answers": [
      {
        "answer": "Inter-State rivers\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Forests",
        "answerNumber": "b"
      },
      {
        "answer": "Citizenship",
        "answerNumber": "c"
      },
      {
        "answer": "Local Self Government",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Forests",
      "answerNumber": "b"
    }
  },
  {
    "question": "In an alphabetical sequence, if ‘EFGH’ is related to ‘VUTS’ then BCD is related to ",
    "questionNumber": "Q.71",
    "answers": [
      {
        "answer": "YXW\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "XU",
        "answerNumber": "b"
      },
      {
        "answer": "ZYW\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "ON",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "YXW\t\t\t",
      "answerNumber": "a"
    }
  },
  {
    "question": "The area of the rhombus whose diagonals are 20 cm, 12 cm is ",
    "questionNumber": "Q.72",
    "answers": [
      {
        "answer": "120 cm2\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "00 cm2",
        "answerNumber": "b"
      },
      {
        "answer": "400 cm2\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "00 cm2",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "120 cm2\t\t",
      "answerNumber": "a"
    }
  },
  {
    "question": "Highest common factor of 90, 150, 225 is",
    "questionNumber": "Q.73",
    "answers": [
      {
        "answer": "15\t",
        "answerNumber": "a"
      },
      {
        "answer": "0   ",
        "answerNumber": "b"
      },
      {
        "answer": "25\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "0",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "15\t",
      "answerNumber": "a"
    }
  },
  {
    "question": "If SOLAR is coded as WSPEV then LUNAR is decoded as ",
    "questionNumber": "Q.74",
    "answers": [
      {
        "answer": "PXREV\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "PYREV",
        "answerNumber": "b"
      },
      {
        "answer": "PXQEV\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "PYCEV",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "PYREV",
      "answerNumber": "b"
    }
  },
  {
    "question": "What is the name of the reversible process, in which the volume of a gas remains constant?",
    "questionNumber": "Q.75",
    "answers": [
      {
        "answer": "Isothermal\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Isobaric",
        "answerNumber": "b"
      },
      {
        "answer": "Isochoric\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Isotopic",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Isochoric\t\t\t",
      "answerNumber": "c"
    }
  },
  {
    "question": "Einstein’s mass energy relationship is",
    "questionNumber": "Q.76",
    "answers": [
      {
        "answer": "E\u003dmc2\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "E\u003dmlc2",
        "answerNumber": "b"
      },
      {
        "answer": "m\u003dElc2\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "c\u003dElm2",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "E\u003dmc2\t\t\t",
      "answerNumber": "a"
    }
  },
  {
    "question": "The DNA consists of equal proportions of purine and pyrimidine bases was found out by",
    "questionNumber": "Q.77",
    "answers": [
      {
        "answer": "Miescger\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Fischer",
        "answerNumber": "b"
      },
      {
        "answer": "Chargaff\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Wilkins",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Chargaff\t\t\t",
      "answerNumber": "c"
    }
  },
  {
    "question": "Rhine-Ruhr region is located in",
    "questionNumber": "Q.78",
    "answers": [
      {
        "answer": "Germany\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Belgium",
        "answerNumber": "b"
      },
      {
        "answer": "France\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Netherland",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Germany\t\t",
      "answerNumber": "a"
    }
  },
  {
    "question": "A vehicle travels 360 km in 4 hours. Find the distance it covers in 6 hours 30 mins. At the same speed.",
    "questionNumber": "Q.79",
    "answers": [
      {
        "answer": "585 km\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "575 km",
        "answerNumber": "b"
      },
      {
        "answer": " 625 km\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "685 km",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "585 km\t\t\t",
      "answerNumber": "a"
    }
  },
  {
    "question": "The HCF and LCM of two numbers are 12 and 144 respectively. One number is 36 the other number is",
    "questionNumber": "Q.80",
    "answers": [
      {
        "answer": "24\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "58       ",
        "answerNumber": "b"
      },
      {
        "answer": "28\t",
        "answerNumber": "c"
      },
      {
        "answer": "48",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "48",
      "answerNumber": "d"
    }
  },
  {
    "question": "The first US author to win the 2016 Man Booker Prize for his novel “The Sell Out” was",
    "questionNumber": "Q.81",
    "answers": [
      {
        "answer": "Paul Beatty\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Brit Bennett",
        "answerNumber": "b"
      },
      {
        "answer": "Alexander Chee\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Colin Wilson",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Paul Beatty\t\t",
      "answerNumber": "a"
    }
  },
  {
    "question": "Consider the following statements:",
    "questionNumber": "Q.82",
    "answers": [
      {
        "answer": "Akbar is famous for his Rajput policy",
        "answerNumber": "a"
      },
      {
        "answer": "He married the eldest daughter of Raja Bihar Mal of Jaipur\u003cbr\u003eChoose the correct answer from the options given below:",
        "answerNumber": "b"
      },
      {
        "answer": "a) only is correct\t",
        "answerNumber": "a"
      },
      {
        "answer": "a) and b) are correct",
        "answerNumber": "b"
      },
      {
        "answer": "only b) is correct",
        "answerNumber": "c"
      },
      {
        "answer": "both a) and b) are wrong",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "a) and b) are correct",
      "answerNumber": "b"
    }
  },
  {
    "question": "The Mendel had selected the following pod colour for his experiments were",
    "questionNumber": "Q.83",
    "answers": [
      {
        "answer": "green and purple\t",
        "answerNumber": "a"
      },
      {
        "answer": "grey and purple",
        "answerNumber": "b"
      },
      {
        "answer": "grey and yellow\t",
        "answerNumber": "c"
      },
      {
        "answer": "green and yellow",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "green and yellow",
      "answerNumber": "d"
    }
  },
  {
    "question": "Fill in the blanks\u003cbr\u003eBDF, HJL, …….., TVX",
    "questionNumber": "Q.84",
    "answers": [
      {
        "answer": "RPN\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "NPQ",
        "answerNumber": "b"
      },
      {
        "answer": "PRN\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "NPR",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "NPR",
      "answerNumber": "d"
    }
  },
  {
    "question": "Simplify:\u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmroot\u003e\u003cmrow\u003e\u003cmroot\u003e\u003cmrow\u003e\u003cmsup\u003e\u003cmrow\u003e\u003cmi\u003ex\u003c/mi\u003e\u003c/mrow\u003e\u003cmrow\u003e\u003cmn\u003e6\u003c/mn\u003e\u003c/mrow\u003e\u003c/msup\u003e\u003c/mrow\u003e\u003cmrow\u003e\u003cmn\u003e3\u003c/mn\u003e\u003c/mrow\u003e\u003c/mroot\u003e\u003c/mrow\u003e\u003cmrow\u003e\u003cmn\u003e5\u003c/mn\u003e\u003c/mrow\u003e\u003c/mroot\u003e\u003c/math\u003e\u003cbr\u003e",
    "questionNumber": "Q.85",
    "answers": [
      {
        "answer": "x\t\t\t\t\u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmfrac\u003e\u003cmrow\u003e\u003cmn\u003e2\u003c/mn\u003e\u003c/mrow\u003e\u003cmrow\u003e\u003cmn\u003e5\u003c/mn\u003e\u003c/mrow\u003e\u003c/mfrac\u003e\u003c/math\u003e\u003cbr\u003e",
        "answerNumber": "a"
      },
      {
        "answer": "x \u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmfrac\u003e\u003cmrow\u003e\u003cmn\u003e1\u003c/mn\u003e\u003c/mrow\u003e\u003cmrow\u003e\u003cmn\u003e5\u003c/mn\u003e\u003c/mrow\u003e\u003c/mfrac\u003e\u003c/math\u003e\u003cbr\u003e",
        "answerNumber": "b"
      },
      {
        "answer": "x\t\t\t\t\u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmfrac\u003e\u003cmrow\u003e\u003cmn\u003e1\u003c/mn\u003e\u003c/mrow\u003e\u003cmrow\u003e\u003cmn\u003e3\u003c/mn\u003e\u003c/mrow\u003e\u003c/mfrac\u003e\u003c/math\u003e\u003cbr\u003e",
        "answerNumber": "c"
      },
      {
        "answer": "x \u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmfrac\u003e\u003cmrow\u003e\u003cmn\u003e6\u003c/mn\u003e\u003c/mrow\u003e\u003cmrow\u003e\u003cmn\u003e5\u003c/mn\u003e\u003c/mrow\u003e\u003c/mfrac\u003e\u003c/math\u003e\u003cbr\u003e",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "x\t\t\t\t\u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmfrac\u003e\u003cmrow\u003e\u003cmn\u003e2\u003c/mn\u003e\u003c/mrow\u003e\u003cmrow\u003e\u003cmn\u003e5\u003c/mn\u003e\u003c/mrow\u003e\u003c/mfrac\u003e\u003c/math\u003e\u003cbr\u003e",
      "answerNumber": "a"
    }
  },
  {
    "question": "2 men and 3 boys can do a piece of work 10 days while 3 men and 2 boys do the same work in 8days. In how many days can 2 men and 1 boy do the work?",
    "questionNumber": "Q.86",
    "answers": [
      {
        "answer": "\t\t\t\t\u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmfrac\u003e\u003cmrow\u003e\u003cmn\u003e2\u003c/mn\u003e\u003c/mrow\u003e\u003cmrow\u003e\u003cmtext\u003e25\u003c/mtext\u003e\u003c/mrow\u003e\u003c/mfrac\u003e\u003c/math\u003e\u003cbr\u003e",
        "answerNumber": "a"
      },
      {
        "answer": "12 \u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmfrac\u003e\u003cmrow\u003e\u003cmn\u003e1\u003c/mn\u003e\u003c/mrow\u003e\u003cmrow\u003e\u003cmn\u003e2\u003c/mn\u003e\u003c/mrow\u003e\u003c/mfrac\u003e\u003c/math\u003e\u003cbr\u003e",
        "answerNumber": "b"
      },
      {
        "answer": "13\t\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "12",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "12 \u003cmath  xmlns\u003d\"http://www.w3.org/1998/Math/MathML\"\u003e\u003cmfrac\u003e\u003cmrow\u003e\u003cmn\u003e1\u003c/mn\u003e\u003c/mrow\u003e\u003cmrow\u003e\u003cmn\u003e2\u003c/mn\u003e\u003c/mrow\u003e\u003c/mfrac\u003e\u003c/math\u003e\u003cbr\u003e",
      "answerNumber": "b"
    }
  },
  {
    "question": "Water flows into a tank with a base 200 m x 150 m through a rectangular pipe 1.5m x 1.25 m at the rate of 20 kmph. In what time in (minutes) will the water rise by 2 metres?",
    "questionNumber": "Q.87",
    "answers": [
      {
        "answer": "93 min\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "95 min",
        "answerNumber": "b"
      },
      {
        "answer": "96 min\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "94 min",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "96 min\t\t\t",
      "answerNumber": "c"
    }
  },
  {
    "question": "Raman’s salary was decreased by 50% and subsequently increased by 50%. How much percent does he lose?",
    "questionNumber": "Q.88",
    "answers": [
      {
        "answer": "15%\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "20%",
        "answerNumber": "b"
      },
      {
        "answer": "25%\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "30 %",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "25%\t\t\t",
      "answerNumber": "c"
    }
  },
  {
    "question": "Who is first Sikh Attorney general of Newjercy, USA who recently appointed?",
    "questionNumber": "Q.89",
    "answers": [
      {
        "answer": "Gurbir S. Gnewal\t",
        "answerNumber": "a"
      },
      {
        "answer": "Gur Bachan Singh",
        "answerNumber": "b"
      },
      {
        "answer": "Amar. S. Singh\t",
        "answerNumber": "c"
      },
      {
        "answer": "Kishore .N. singh",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Gurbir S. Gnewal\t",
      "answerNumber": "a"
    }
  },
  {
    "question": "National basket ball championship held in which city?",
    "questionNumber": "Q.90",
    "answers": [
      {
        "answer": "Thiruvananthapuram \t",
        "answerNumber": "a"
      },
      {
        "answer": "Kochi",
        "answerNumber": "b"
      },
      {
        "answer": "Chennai\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Bangalore",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Chennai\t\t\t",
      "answerNumber": "c"
    }
  },
  {
    "question": "Which of following bank and first bank to cross the mark of Rs 5 lakh crore in market capitalization?",
    "questionNumber": "Q.91",
    "answers": [
      {
        "answer": "HDFC Bank     \t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Punjab National Bank",
        "answerNumber": "b"
      },
      {
        "answer": "SBI\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Axis Bank ",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "HDFC Bank     \t\t",
      "answerNumber": "a"
    }
  },
  {
    "question": "Who headed the committee on reforms in the criminal justice system in 2003 which government going to revisit?",
    "questionNumber": "Q.92",
    "answers": [
      {
        "answer": "H. L. Dattu\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "P.L. Bagavad",
        "answerNumber": "b"
      },
      {
        "answer": "R.M. Lodha\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "V.S. Malimath",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "V.S. Malimath",
      "answerNumber": "d"
    }
  },
  {
    "question": "Union cabinet has given its approval for the creation of post of chairman and technical members of NAA under GST, What is the full form of NAA?",
    "questionNumber": "Q.93",
    "answers": [
      {
        "answer": "National Administrative Authority",
        "answerNumber": "a"
      },
      {
        "answer": "National Anti- Profiteering Authority",
        "answerNumber": "b"
      },
      {
        "answer": "Non Anti- Profiteering Authority",
        "answerNumber": "c"
      },
      {
        "answer": "National Anti Law Authority",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "National Anti- Profiteering Authority",
      "answerNumber": "b"
    }
  },
  {
    "question": "Which of the following state hoisting first ever hot air balloon festival?",
    "questionNumber": "Q.94",
    "answers": [
      {
        "answer": "Telegana\t\t \t  \u003cbr\u003e b) Karnataka",
        "answerNumber": "a"
      },
      {
        "answer": "Himachal Pradesh\t    ",
        "answerNumber": "c"
      },
      {
        "answer": "Andhra Pradesh",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Andhra Pradesh",
      "answerNumber": "d"
    }
  },
  {
    "question": "Which of the following country is top in aviation market?\t",
    "questionNumber": "Q.95",
    "answers": [
      {
        "answer": "USA\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "UK\t",
        "answerNumber": "b"
      },
      {
        "answer": "China\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Japan",
        "answerNumber": "d"
      }
    ]
  },
  {
    "question": "Union Minister Nitin Gadkari announced world supported Rs ________ crore schemeto improve the irrigation facilities and water accessibility capacity in several state",
    "questionNumber": "Q.96",
    "answers": [
      {
        "answer": "4000     ",
        "answerNumber": "a"
      },
      {
        "answer": "5000\t",
        "answerNumber": "b"
      },
      {
        "answer": "6000       ",
        "answerNumber": "c"
      },
      {
        "answer": "7000",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "6000       ",
      "answerNumber": "c"
    }
  },
  {
    "question": "Which of the following state became the first state in India to set up green university?",
    "questionNumber": "Q.97",
    "answers": [
      {
        "answer": "Kerala\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "West Bengal",
        "answerNumber": "b"
      },
      {
        "answer": "Jharkhand\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Chattisgarh",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "West Bengal",
      "answerNumber": "b"
    }
  },
  {
    "question": "Sree Rupa Mukherjee who recently passed away related to which sport?",
    "questionNumber": "Q.98",
    "answers": [
      {
        "answer": "Boxing\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Tennis",
        "answerNumber": "b"
      },
      {
        "answer": "Badminton\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Cricket",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Cricket",
      "answerNumber": "d"
    }
  },
  {
    "question": " “Petro” new virtual currency of which of the following country?",
    "questionNumber": "Q.99",
    "answers": [
      {
        "answer": "Greece\t\t\t",
        "answerNumber": "a"
      },
      {
        "answer": "Venezuela",
        "answerNumber": "b"
      },
      {
        "answer": "Spain\t\t\t",
        "answerNumber": "c"
      },
      {
        "answer": "Japan",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Venezuela",
      "answerNumber": "b"
    }
  },
  {
    "question": "Who became first Sikh woman mayor in USA?",
    "questionNumber": "Q.100",
    "answers": [
      {
        "answer": "Mamta Khalia\t",
        "answerNumber": "a"
      },
      {
        "answer": "Sunitha Krishnan",
        "answerNumber": "b"
      },
      {
        "answer": "Preet Didbal\t",
        "answerNumber": "c"
      },
      {
        "answer": "Sumidhi Chauhan\u003cbr\u003e\u003cbr\u003e\u003cbr\u003e",
        "answerNumber": "d"
      }
    ],
    "correctAnswer": {
      "answer": "Sumidhi Chauhan",
      "answerNumber": "d"
    }
  }
],
        }
    }
}
</script>
<style>

</style>
