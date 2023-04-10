//SPDX-License-Identifier: MIT
// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.4;


contract CourseMarketplace {
    constructor() {
        
    }
    //When you purchase the course, course will have some states 
    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    //structure of course
    struct Course {
        uint id; //32 byte
        uint price; //32 byte
        //it will identify the user
        bytes32 proof;//hexadecimal char of 256 length
        address owner; //20 bytes
        State state; //1 byte
    }

}