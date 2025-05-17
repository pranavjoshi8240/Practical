const testArray = [
    {
        name: "K1",
        child: [
            {
                name: "K1-1",
                child: [
                    {
                        name: "K1-2",
                        child: [
                            {
                                name: "k1-3.1",
                                child: []
                            },
                            {
                                name: "k1-3.2",
                                child: []
                            },
                        ]
                    },
                    {
                        name: "K1-2.1",
                        child: [
                            {
                                name: "k1-2.1",
                                child: []
                            },
                            {
                                name: "k1-2.2",
                                child: []
                            },
                            {
                                name: "k1-2.3",
                                child: []
                            },
                        ]
                    }
                ]
            },
            {
                name: "K2-1",
                child: [
                    {
                        name: "K2-2",
                        child: [
                            {
                                name: "k2-3.1",
                                child: []
                            },
                            {
                                name: "k2-3.2",
                                child: []
                            },
                        ]
                    },
                    {
                        name: "K2-2.1",
                        child: [
                            {
                                name: "k2-2.1",
                                child: []
                            },
                            {
                                name: "k2-2.2",
                                child: []
                            },
                        ]
                    }
                ]
            },
        ]
    }
    ,,..
]

const inputArray = ["K1", "K1-1", "K1-2.1", "k1-2.3", "test"]
// var outputArray = {};
// for (i = 0; i < inputArray.length; i++) {
//     for (j = 0; j < testArray.length; j++) {
//         // console.log(".....", inputArray[j])
//         //  outputArray=inputArray[i];
//         if (inputArray[i] == testArray[j].name) {
//             outputArray = (inputArray[i] = testArray[j]);
//             outputArray = {
//                 ...outputArray,
//                 [inputArray[i]]:testArray[j].child
//             }
//         }
//         if (testArray[j].child) {
//             // console.log("temp.....", testArray[j].child[0].child)
//             const temp2=testArray[j].child;
//             for (k = 0; k < temp2.length; k++) {
//                 console.log("temp.....", temp2.name,inputArray[i])

//                 if (inputArray[i] == temp2.name) {
//                     outputArray = (inputArray[i] = testArray[k]);

//                     console.log("temp.....", outputArray)
//                 }

//             }
//         }
//     }
// }
var outputArray = [];
for (i = 0; i < inputArray.length; i++) {
    for (j = 0; j < testArray.length; j++) {
        var Temp = child(inputArray[i], testArray[j])
        outputArray = {
            ...outputArray,
            [inputArray[i]]: Temp
        }

    }
    outputArray = {
        ...outputArray,
        [inputArray[i]]: Temp
    }
    console.log(".......", outputArray)
}
function child(array, test) {
    console.log("array,", array, test)
    if (array == test.name) {
        // console.log("test name ", array, test.child)
        return (test.child)
    }
}

// child("k1",[])

const Output = {}
inputArray.map((item)=>{
    const obj = child(item,data)
    Output[obj.name] : obj.child
})


const child = (name, child) =>{
    child.map((item)=>{
        if(item.name === name){
            return item
        }
    })
}


Input: "K1/K1-1/K1-2.1/k1-2.3/test"

Output: {
    "K1":[],
    "K1-1": [
        {
                        name: "K1-2",
                        child: [
                {
                                name: "k1-3.1",
                                child: []
                },
                {
                                name: "k1-3.2",
                                child: []
                },
            ]
        },
        {
                        name: "K1-2.1",
                        child: [
                {
                                name: "k1-2.1",
                                child: []
                },
                {
                                name: "k1-2.2",
                                child: []
                },
                {
                                name: "k1-2.3",
                                child: []
                },
            ]
        }
    ],
    "K1-2.1":[
        {
            name: "k1-2.1",
            child: []
        },
        {
            name: "k1-2.2",
            child: []
        },
        {
            name: "k1-2.3",
            child: []
        },
    ],
    "k1-2.3":[],
    "test":[]
}


