import React from "react";

const ComicImages = [
  {
    id: 1,
    Name: "Ultimate Comics Avengers Vs. New Ultimates: Death of Spider-Man (Trade Paperback)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/e/90/5b33cc0c0ee5c.jpg",
  },
  {
    id: 2,
    Name: "Ultimate Comics Avengers Vs. New Ultimates: Death of Spider-Man (Trade Paperback)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/c/80/4dee8ce72b514.jpg",
  },
  {
    id: 3,
    Name: "Ultimate Comics New Ultimates: Thor Reborn (Trade Paperback)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/7/60/4d9359c0e957f.jpg",
  },
  {
    id: 4,
    Name: "Ultimate Comics New Ultimates: Thor Reborn (Trade Paperback)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/3/40/4d82569d01b42.jpg",
  },
  {
    id: 5,
    Name: "Ultimate Comics New Ultimates: Thor Reborn (Trade Paperback)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/2/d0/4cb715442531c.jpg",
  },
  {
    id: 6,
    Name: "Ultimate Comics New Ultimates: Thor Reborn (Trade Paperback)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/5/c0/4cb7153dd0505.jpg",
  },
  {
    id: 7,
    Name: "Ultimate Comics New Ultimates: Thor Reborn (Trade Paperback)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/b/e0/4cb71535cb0df.jpg",
  },
  {
    id: 8,
    Name: "Ultimate Comics New Ultimates: Thor Reborn (Trade Paperback)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/60/4cb7152f6c473.jpg",
  },
  {
    id: 9,
    Name: "Ultimate Comics New Ultimates: Thor Reborn (Trade Paperback)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/80/4c98b64a4aa39.jpg",
  },
  {
    id: 10,
    Name: "Ultimate Comics New Ultimates: Thor Reborn (Trade Paperback)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/90/4c98b64360c5c.jpg",
  },
  {
    id: 11,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #6 (Hitch Variant)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/3/a0/4e177479305ad.jpg",
  },
  {
    id: 12,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #6",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/3/60/4f6214d6e1068.jpg",
  },
  {
    id: 13,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #7",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/c/50/4d9cc097d1db2.jpg",
  },
  {
    id: 14,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #5",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/3/a0/4f6215c1583f7.jpg",
  },
  {
    id: 15,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #6",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/3/30/4d88c04c15640.jpg",
  },
  {
    id: 16,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #4 (HITCH VARIANT)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/90/4dcd801b884f4.jpg",
  },
  {
    id: 17,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #3 (2nd Printing Variant)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/c/a0/4dcd7f4f81c25.jpg",
  },
  {
    id: 18,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #4",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/3/10/4f6216223e61d.jpg",
  },
  {
    id: 19,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #5",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/80/4d55b576c352d.jpg",
  },
  {
    id: 20,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #2 (2nd Printing Variant)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/c/10/4dcd7c232bc92.jpg",
  },
  {
    id: 21,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #1 (2nd Printing Variant)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/2/f0/4dcd78ec8fe2c.jpg",
  },
  {
    id: 22,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #3",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/1/40/4f62168663e59.jpg",
  },
  {
    id: 23,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #4",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/5/70/4d35ac1009d31.jpg",
  },
  {
    id: 24,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #3 (CHO VARIANT)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/c/90/4d9f5cb3b219f.jpg",
  },
  {
    id: 25,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #2",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/c/60/4f6216e2b5cfe.jpg",
  },
  {
    id: 26,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #3",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/2/b0/4d7a8082b1230.jpg",
  },
  {
    id: 27,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #4",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/10/4d7915711eac0.jpg",
  },
  {
    id: 28,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #5",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/c/03/4d791532586e0.jpg",
  },
  {
    id: 29,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #6",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/c/f0/4d7914f9efcd0.jpg",
  },
  {
    id: 30,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #7",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/3/70/4d7914b5066a5.jpg",
  },
  {
    id: 31,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #8",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/7/50/4d79146e5d9a9.jpg",
  },
  {
    id: 32,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #9",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/30/4d7913e3f1a2d.jpg",
  },
  {
    id: 33,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #10",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/70/4d79130ea48a7.jpg",
  },
  {
    id: 34,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #2 (HITCH VARIANT)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/3/b0/4d7a810a91958.jpg",
  },
  {
    id: 35,
    Name: "THE ULTIMATES MGC 1 (2011) #1",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/7/60/4d67e549c09e8.jpg",
  },
  {
    id: 36,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #1",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/90/4f628c6f0c390.jpg",
  },
  {
    id: 37,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #2",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/80/4f62181178bde.jpg",
  },
  {
    id: 38,
    Name: "Ultimate Avengers Vs. New Ultimates (2011) #3",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/5/c0/4d52f400e741a.jpg",
  },
  {
    id: 39,
    Name: "Ultimate Comics Doom (2010) #2",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/3/f0/4f624364986ac.jpg",
  },
  {
    id: 40,
    Name: "Ultimate Comics Doom (2010) #2",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/b/e0/4cb5fc28232cb.jpg",
  },
  {
    id: 41,
    Name: "Ultimate Avengers 3 (2010) #6",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/5/03/4f6249c903600.jpg",
  },
  {
    id: 42,
    Name: "Ultimate Avengers 3 (2010) #6",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/3/10/4cb8b62055830.jpg",
  },
  {
    id: 43,
    Name: "Ultimate Avengers 3 (2010) #5",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/3/20/4f624970b61b0.jpg",
  },
  {
    id: 44,
    Name: "Ultimate Avengers 3 (2010) #5",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/a/03/4c91172275d39.jpg",
  },
  {
    id: 45,
    Name: "Ultimate Comics Doom (2010) #1",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/3/00/4f6242f2037c2.jpg",
  },
  {
    id: 46,
    Name: "Ultimate Comics Doom (2010) #1",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/70/4c90edbc75291.jpg",
  },
  {
    id: 47,
    Name: "Ultimate Avengers 3 (2010) #4",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/00/4f624901bac36.jpg",
  },
  {
    id: 48,
    Name: "Ultimate Avengers 3 (2010) #4",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/70/4c65569220ecd.jpg",
  },
  {
    id: 49,
    Name: "Ultimate Avengers 3 (2010) #3",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/d/03/4f6248838215c.jpg",
  },
  {
    id: 50,
    Name: "Ultimate Avengers 3 (2010) #3",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/3/60/4c44ac4565680.jpg",
  },
  {
    id: 51,
    Name: "Ultimate Avengers 3 (2010) #2",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/70/5a8f2b1372ef6.jpg",
  },
  {
    id: 52,
    Name: "Ultimate Avengers 3 (2010) #2",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/7/80/4c0fda1eadccd.jpg",
  },
  {
    id: 53,
    Name: "Ultimate Avengers 3 (2010) #1",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/f/c0/5a8f269d6adfa.jpg",
  },
  {
    id: 54,
    Name: "Ultimate Avengers 3 (2010) #2",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/c0/4c59b8ec80327.jpg",
  },
  {
    id: 55,
    Name: "Ultimate Avengers 3 (2010) #3",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/d/30/4c59b8e69cb6d.jpg",
  },
  {
    id: 56,
    Name: "Ultimate Avengers 3 (2010) #4",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/f/90/4c59b8da8b2ec.jpg",
  },
  {
    id: 57,
    Name: "Ultimate Avengers 3 (2010) #5",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/a0/4c59b8d446ec0.jpg",
  },
  {
    id: 58,
    Name: "Ultimate Avengers 3 (2010) #6",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/e0/4c3c95e0699cb.jpg",
  },
  {
    id: 59,
    Name: "Ultimate Avengers 3 (2010) #7",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/b0/4c3c95da679c1.jpg",
  },
  {
    id: 60,
    Name: "Ultimate Avengers 3 (2010) #8",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/a/20/4c3c95d468c7f.jpg",
  },
  {
    id: 61,
    Name: "Ultimate Avengers 3 (2010) #9",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/c/80/4c3c95ce1dc75.jpg",
  },
  {
    id: 62,
    Name: "Ultimate Avengers 3 (2010) #10",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/c0/4c3c95c797cc0.jpg",
  },
  {
    id: 63,
    Name: "Ultimate Avengers 3 (2010) #11",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/c/a0/4bed5fc4a1859.jpg",
  },
  {
    id: 64,
    Name: "Ultimate Comics Avengers 2 (2010) #6",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/8/f0/515f0dbf31c73.jpg",
  },
  {
    id: 65,
    Name: "Ultimate Comics Avengers 2 (2010) #7",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/5/f0/4c52f7453b04a.jpg",
  },
  {
    id: 66,
    Name: "Ultimate Comics Avengers 2 (2010) #8",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/80/4c52f73f415de.jpg",
  },
  {
    id: 67,
    Name: "Ultimate Comics Avengers 2 (2010) #9",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/90/4c52f73927a1f.jpg",
  },
  {
    id: 68,
    Name: "Ultimate Comics Avengers 2 (2010) #10",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/2/f0/4c52f733140d4.jpg",
  },
  {
    id: 69,
    Name: "Ultimate Comics Avengers 2 (2010) #11",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/10/4c52f72cb5261.jpg",
  },
  {
    id: 70,
    Name: "Ultimate Comics Avengers 2 (2010) #12",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/40/4c52f726707aa.jpg",
  },
  {
    id: 71,
    Name: "Ultimate Comics Avengers 2 (2010) #13",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/f/40/4beac4349bee4.jpg",
  },
  {
    id: 72,
    Name: "Ultimate Comics Avengers 2 (2010) #5",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/5/60/515f0da61f101.jpg",
  },
  {
    id: 73,
    Name: "Ultimate Comics Avengers 2 (2010) #6",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/a/90/4c3de29579f9f.jpg",
  },
  {
    id: 74,
    Name: "Ultimate Comics Avengers 2 (2010) #7",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/f/00/4c3de28f30aec.jpg",
  },
  {
    id: 75,
    Name: "Ultimate Comics Avengers 2 (2010) #8",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/e0/4c3de2891dd59.jpg",
  },
  {
    id: 76,
    Name: "Ultimate Comics Avengers 2 (2010) #9",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/3/40/4c3de27090338.jpg",
  },
  {
    id: 77,
    Name: "Ultimate Comics Avengers 2 (2010) #10",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/f/40/4c3de269bacf3.jpg",
  },
  {
    id: 78,
    Name: "Ultimate Comics Avengers 2 (2010) #11",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/2/80/4c3de26252030.jpg",
  },
  {
    id: 79,
    Name: "Ultimate Comics Avengers 2 (2010) #12",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/4/60/4c3de25adaabb.jpg",
  },
  {
    id: 80,
    Name: "Ultimate Comics Avengers 2 (2010) #13",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/30/4bc5e8342165b.jpg",
  },
  {
    id: 81,
    Name: "Ultimate Comics Avengers 2 (2010) #4",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/3/20/515f0d95d5032.jpg",
  },
  {
    id: 82,
    Name: "Ultimate Comics Avengers 2 (2010) #5",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/d0/4c7c59a443ed8.jpg",
  },
  {
    id: 83,
    Name: "Ultimate Comics Avengers 2 (2010) #6",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/b0/4c19164f19e7b.jpg",
  },
  {
    id: 84,
    Name: "Ultimate Comics Avengers 2 (2010) #7",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/00/4c19164adcf05.jpg",
  },
  {
    id: 85,
    Name: "Ultimate Comics Avengers 2 (2010) #8",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/3/10/4c19164552b5a.jpg",
  },
  {
    id: 86,
    Name: "Ultimate Comics Avengers 2 (2010) #9",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/40/4c191634e8cd0.jpg",
  },
  {
    id: 87,
    Name: "Ultimate Comics Avengers 2 (2010) #10",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/3/60/4c19162ba4875.jpg",
  },
  {
    id: 88,
    Name: "Ultimate Comics Avengers 2 (2010) #11",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/c0/4ba949451d76c.jpg",
  },
  {
    id: 89,
    Name: "Ultimate Comics Avengers 2 (2010) #3",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/c/30/515f0d85cfda2.jpg",
  },
  {
    id: 90,
    Name: "Ultimate Comics Avengers 2 (2010) #4",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/2/90/4c0910da18018.jpg",
  },
  {
    id: 91,
    Name: "Ultimate Comics Avengers 2 (2010) #5",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/2/90/4c0910d5a0337.jpg",
  },
  {
    id: 92,
    Name: "Ultimate Comics Avengers 2 (2010) #6",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/5/d0/4c0910d0e38b5.jpg",
  },
  {
    id: 93,
    Name: "Ultimate Comics Avengers 2 (2010) #7",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/b/e0/4c090f2de80bb.jpg",
  },
  {
    id: 94,
    Name: "Ultimate Comics Avengers 2 (2010) #8",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/b/c0/4c090f2abb57b.jpg",
  },
  {
    id: 95,
    Name: "Ultimate Comics Avengers 2 (2010) #9",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/a0/4c090f277d9db.jpg",
  },
  {
    id: 96,
    Name: "Ultimate Comics Avengers 2 (2010) #10",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/60/4ba94af29813c.jpg",
  },
  {
    id: 97,
    Name: "Ultimate Comics Avengers 2 (2010) #2",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/00/515f0d890d01d.jpg",
  },
  {
    id: 98,
    Name: "Ultimate Comics Avengers 2 (2010) #2",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/2/40/4baa9bee37f0f.jpg",
  },
  {
    id: 99,
    Name: "Ultimate Comics Avengers 2 (2010) #1",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/90/515f0d727c83e.jpg",
  },
  {
    id: 100,
    Name: "Ultimate Avengers (2009) #6",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/c/30/5a8f20db4dc65.jpg",
  },
  {
    id: 101,
    Name: "Ultimate Avengers (2009) #6",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/5/50/515f0ba1711f0.jpg",
  },
  {
    id: 102,
    Name: "Ultimate Avengers (2009) #5",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/60/50b38e7bdd508.jpg",
  },
  {
    id: 103,
    Name: "Ultimate Avengers (2009) #4",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/8/c0/515f0cae4224e.jpg",
  },
  {
    id: 104,
    Name: "Ultimate Avengers (2009) #5",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/e/50/515f0bab5bda2.jpg",
  },
  {
    id: 105,
    Name: "Ultimate Avengers (2009) #6",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/5/c0/4bb409d54e220.jpg",
  },
  {
    id: 106,
    Name: "Ultimate Avengers (2009) #7",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/a0/4bad8e619930e.jpg",
  },
  {
    id: 107,
    Name: "Ultimate Avengers (2009) #8",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/c/00/4bad8e5b0e452.jpg",
  },
  {
    id: 108,
    Name: "Ultimate Avengers (2009) #9",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/e0/4bad8e5597623.jpg",
  },
  {
    id: 109,
    Name: "Ultimate Avengers (2009) #10",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/c/20/4bad8e50c770c.jpg",
  },
  {
    id: 110,
    Name: "Ultimate Avengers (2009) #11",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/f/b0/4bad8e4b96d4e.jpg",
  },
  {
    id: 111,
    Name: "Ultimate Avengers (2009) #12",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/f/10/4bad8cfbe4324.jpg",
  },
  {
    id: 112,
    Name: "Ultimate Avengers (2009) #3",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/50/515f0bb489d2d.jpg",
  },
  {
    id: 113,
    Name: "Ultimate Avengers (2009) #4",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/6/40/4bb4348228c4e.jpg",
  },
  {
    id: 114,
    Name: "Ultimate Avengers (2009) #5",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/b/c0/4bae7a423bb28.jpg",
  },
  {
    id: 115,
    Name: "Ultimate Avengers (2009) #6",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/e/60/4bae7a3daa800.jpg",
  },
  {
    id: 116,
    Name: "Ultimate Avengers (2009) #7",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/00/4bae7a391930b.jpg",
  },
  {
    id: 117,
    Name: "Ultimate Avengers (2009) #8",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/a0/4bae7a3474f58.jpg",
  },
  {
    id: 118,
    Name: "Ultimate Avengers (2009) #9",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/c/10/4bae7a2ff3632.jpg",
  },
  {
    id: 119,
    Name: "Ultimate Avengers (2009) #10",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/b/e0/4bae7a2b7c812.jpg",
  },
  {
    id: 120,
    Name: "Ultimate Avengers (2009) #11",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/8/90/4bae242183dc1.jpg",
  },
  {
    id: 121,
    Name: "Ultimate Avengers (2009) #12",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/8/a0/4bae241d0d842.jpg",
  },
  {
    id: 122,
    Name: "Ultimate Avengers (2009) #13",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/b/f0/4bae24185afa6.jpg",
  },
  {
    id: 123,
    Name: "Ultimate Avengers (2009) #14",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/e/a0/4bae2413bac7f.jpg",
  },
  {
    id: 124,
    Name: "Ultimate Avengers (2009) #15",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/b/a0/4bae22b0d5f53.jpg",
  },
  {
    id: 125,
    Name: "Ultimate Avengers (2009) #16",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/e/d0/4bae22ac3e9a6.jpg",
  },
  {
    id: 126,
    Name: "Ultimate Avengers (2009) #2",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/e0/5a8f06faf0769.jpg",
  },
  {
    id: 127,
    Name: "Ultimate Avengers (2009) #3",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/8/e0/515f0bc0e48a5.jpg",
  },
  {
    id: 128,
    Name: "Ultimate Avengers (2009) #4",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/1/90/4c07d1ab6dabe.jpg",
  },
  {
    id: 129,
    Name: "Ultimate Avengers (2009) #5",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/b/e0/4bb3e01fba496.jpg",
  },
  {
    id: 130,
    Name: "Ultimate Avengers (2009) #6",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/e/90/4bb3e01a74eae.jpg",
  },
  {
    id: 131,
    Name: "Ultimate Avengers (2009) #7",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/5/f0/4bb3e0150e919.jpg",
  },
  {
    id: 132,
    Name: "Ultimate Avengers (2009) #8",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/e/80/4bb3e00fb8f0a.jpg",
  },
  {
    id: 133,
    Name: "Ultimate Avengers (2009) #9",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/8/e0/4bb3e00a807f7.jpg",
  },
  {
    id: 134,
    Name: "Ultimate Avengers (2009) #10",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/40/4bb3e0055dc99.jpg",
  },
  {
    id: 135,
    Name: "Ultimate Avengers (2009) #1",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/2/a0/515f0be322127.jpg",
  },
  {
    id: 136,
    Name: "Ultimate Avengers (2009) #2",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/1/b0/4cbcba5a5e24e.jpg",
  },
  {
    id: 137,
    Name: "Ultimate Avengers (2009) #3",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/a/50/4c8693f88cee0.jpg",
  },
  {
    id: 138,
    Name: "Ultimate Avengers (2009) #4",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/b/b0/4bb49201db1ef.jpg",
  },
  {
    id: 139,
    Name: "Ultimate Spider-Man Vol. 12: Superstars (Trade Paperback)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/d0/58e53922cca8f.jpg",
  },
  {
    id: 140,
    Name: "Ultimate Spider-Man Vol. 12: Superstars (Trade Paperback)",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/9/60/4bc6493fa373b.jpg",
  },
  {
    id: 141,
    Name: "Ultimate Spider-Man (2000) #70",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/c/f0/58e6a16fcbf58.jpg",
  },
  {
    id: 142,
    Name: "Ultimate X-Men (2001) #27",
    Image: "http://i.annihil.us/u/prod/marvel/i/mg/e/f0/5baa45e672cad.jpg",
  },
];

const ComicsImages = () => {
  return (
    <div>
      {ComicImages.slice(0, 10).map((ComicImage, index) => (
        <div className="">
          <p key={index}>Name:{ComicImage.Name}</p>
          <img src={ComicImage.Image} />
        </div>
      ))}
    </div>
  );
};

export default ComicsImages;
