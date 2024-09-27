const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');

const fs = require('fs');
const csv = require('csv-parser');


const client = new PrismaClient();

// async function fixRankRace() {
//   const raceRunn = await client.raceRunner.findMany({
//     where:{
//       raceId: 21
//     },
//     orderBy: {
//       entryTime:"asc"
//     }
//   })

//   if(raceRunn) {

//     const dataxc = raceRunn.map((item,i) => {
//       item.rank_race = (i + 1).toString();

//       return item;
//     })

//     for(const record of dataxc) {

//       const updateon = await client.raceRunner.update({ 
//         where:{
//           id: record.id
//         },
//         data:{
//           rank_race: record.rank_race
//         }
//       })

//     }
//   } else {
//     console.log("no race yet")
//   }
    
  
  
// }

async function createEventWithRaces() {

  const yearr = "2023";

  const events = await client.events.create({
      data: {
      title: "Bangsean42 " + yearr,
      location: "Thailand",
      province: "Chonburi",
      startperiod: yearr + "-05-18T07:00:00Z",
      endperiod: yearr + "-06-19T12:00:00Z",
      cover_img: "https://i.postimg.cc/VvtGG2PR/426600662-875436607712568-8807470960080430691-n.jpg",
      logo_img:"https://i.postimg.cc/VvtGG2PR/426600662-875436607712568-8807470960080430691-n.jpg",
      races: {
        create: [
        //   {
        //     title: "5 KM",
        //     distance: 5.00,
        //     starttime: yearr + "-05-18T07:00:00Z",
        //     endtime: yearr + "-06-19T12:00:00Z",
          
        // },
        {
          title: "42 KM",
          distance: 42.00,
          starttime: yearr + "-05-18T07:00:00Z",
          endtime: yearr + "-06-19T12:00:00Z",
        }
      ]
      }
    }
  })
  console.log(events)
}

async function createEvent() {
    const events = await client.events.create({
  
      data: {
        title: "Laguna Phuket Marathon 2023",
        location: "Phuket",
        startperiod: "2023-12-18T07:00:00Z",
        endperiod: "2023-12-18T12:00:00Z",
        cover_img: "https://my.raceresult.com/228976/cover",
        logo_img:"https://i.ibb.co/6HwHR5t/292397273-1697110870637938-1936604441235097268-n.jpg"
      }
    })
    console.log(events)
}

async function createRace() {
  const races = await client.races.create({
    data: {
      title: "42 KM",
      distance: 42.00,
      starttime: "2024-05-18T07:00:00Z",
      endtime: "2024-06-18T12:00:00Z",
      eventid: 31,
    }
  })

  console.log(races)
}

async function eventCreate(runnerData) {

  // runnerData.forEach((item,i) => {
  //   console.log(item)
  //   if(!item.lastname)
  //   console.log(item.firstname + item.lastname)
  // })

  // const events = await client.events.create({
  
  //     data: {
  //       title: "Bangsean21 2022",
  //       location: "Chonburi",
  //       startPeriod: "2022-12-18T07:00:00Z",
  //       endPeriod: "2022-12-18T12:00:00Z",
  //       cover_img: "https://my.raceresult.com/228976/cover",
  //       logo_img:"https://i.ibb.co/6HwHR5t/292397273-1697110870637938-1936604441235097268-n.jpg"
  //     }
  //   })
  //   console.log(events)

    const races = await client.races.create({
      data: {
        title: "21 KM",
        distance: 21.00,
        starttime: "2022-12-18T07:00:00Z",
        endTime: "2022-12-18T12:00:00Z",
        eventid: 16,
        racerunners: {
          createMany: {
            data: runnerData
          }
        }
      }
    });

    // console.log(races);

    // const racerunner = await client.raceRunner.createMany({
    //   data: runnerData
    // })

    //  const racerunner = await client.raceRunner.create({
    //   data: runnerData[0]
    // })
    // console.log(runnerData[0])
}

async function import_excel() { 
  const raw = fs.readFileSync('bangsean21_2022.csv', 'utf8');

  const data  = raw.split(/\r?\n/);

  const dataPush = [];

  

  if(data[0].includes(",Name,")) {
    data.shift();
  }
  
  data.forEach((item,i) => {
    
        faker.seed()
        const cellExtract = item.split(",");
        const age = faker.number.int({ min: 35, max: 55 })

        // console.log(cellExtract)

        const dataPushX = {};


        dataPushX.nation = cellExtract[2];
        dataPushX.score = 88;
        dataPushX.age = age;
        dataPushX.gender = cellExtract[3];
        dataPushX.entrytime = cellExtract[4];
        dataPushX.rank_race = cellExtract[0];

        // dataPushX.raceId = 4;
      
        if(cellExtract[1].includes("Mr.") || cellExtract[1].includes("Ms.") || cellExtract[1].includes("Mrs.")) {
          const fullNameSplit = (cellExtract[1].replaceAll(". ", ".")).split(" ");
          dataPushX.firstname = fullNameSplit[0]
          dataPushX.lastname = fullNameSplit[1]
         

        } else {
          const fullNameSplit = (cellExtract[1]).split(" ");

          if(fullNameSplit.length > 0) {
            dataPushX.firstname = fullNameSplit[0]

            if(fullNameSplit.length > 2) {
              dataPushX.lastname = fullNameSplit[1] + fullNameSplit[2]
            } else {
              dataPushX.lastname = fullNameSplit[1]
            }
          }
       
        }

        dataPush.push(dataPushX)

      // const regexPattern = /\b\d{2}:\d{2}:00\b/g;
      // const matches = cellExtract[6].match(regexPattern);

      // console.log("Matches:", matches);
  })

  await eventCreate(dataPush);
}

async function main() {

  // const dataPush = [];

  // for(let i=60; i<100;i++) {
  //   faker.seed(i)

  //   const firstname= faker.person.firstName();
  //   const lastname = faker.person.lastName();
  //   const entryTime = "0:19:" + ((i < 10) ? "0" + i : i);
  //   const score = faker.number.int({ min: 30, max: 70 })

  //   // const email = faker.internet.email();
  //   const age = faker.number.int({ min: 20, max: 45 })
  //   const gender = faker.person.sex() === "male" ? "M" : "F";
  //   const nation = faker.location.country();
  //   const raceId = 2;

  //   dataPush.push({
  //     firstname,
  //     lastname,
  //     entryTime,
  //     score,
  //     age,
  //     gender,
  //     nation,
  //     raceId
  //   })
  //   // console.log(age + " " + firstname + " " + lastname + "\n Sex : " + sex_);
  // }


  // const raceBulk = await client.raceRunner.createMany({
  //   data: dataPush
  // })
  // console.log(raceBulk)

    // const runner = await client.runner.upsert({
    //     where: { id: 1 },
    //     update: {},
    //     create: {
    //         email: "tdev@thai.run",
    //         password: "inqe4q$@!##",
    //         firstname: "TDEV",
    //         lastname: "XOD"
    //     },
    // });

    // console.log(runner)

    // const events = await client.events.upsert({
    //   where: {id: 3},
    //   update: {},
    //   create: {
    //     title: "Thairun X ภาษาไทย",
    //     location: "Bangkok"
    //   }
    // })

    const races = await client.races.create({

      data: {
        title: "สเตเดี่ยม Race",
        distance: 15.00,
        starttime: "2023-11-03T11:21:39Z",
        endtime: "2023-11-03T14:21:39Z",
        eventid: 2
      }
    });

    // const racerunner = await client.raceRunner.upsert({
    //   where: {id: 1},
    //   update: {},
    //   create: {
    //     firstname: "TDEV",
    //     lastname: "XOD",
    //     entryTime: "0:18:00",
    //     score: 90,
    //     age: 67,
    //     gender: "M",
    //     nation: "Thailand",
    //     raceId: 2
    //   }
    // })

    // console.log("runner = > ");
    // console.log(runner);
    // console.log(" _________ ");
    // console.log("events = > ");
    // console.log(events)
    // console.log(" _________ ");
    // console.log("racerunner = > ");
    // console.log(racerunner)

    // const testFetch = await client.events.findUnique({
    //   where: {
    //     id: 1
    //   },
    //   include: {
    //     races: {
    //       include: {
    //         racerunners: true
    //       }
    //     }
    //   }
    // });

    // const callRace = await client.races.findUnique({
    //   where: {
    //     eventId: 1
    //   },
    //   include: {
    //       racerunners: true
    //   }
    // });

    // console.log(testFetch);

}



createEventWithRaces()
  .then(() => {
    client.$disconnect();
    process.exit(0);
  })
  .catch((e) => {
    console.log("error:", e);
    client.$disconnect();
    process.exit(1);
  });
