//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract CourseMarketplace {

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

    //mapping of course hash to course data
    mapping (bytes32 => Course) private ownedCourses;

    //mapping of course id to course hash 
    mapping (uint => bytes32) private ownedCourseHash;

    //number of owned courses + id of the course
    uint private totalOwnedCourses;

    //contract owner address (like an admin)
    address payable private owner;

    ///Sender is not course owner
    error CourseHasOwner();

    ///Course has already a owner
    error SenderIsNotCourseOwner();

    ///Only Owner has access
    error OnlyOwner();

    /// Course has invalid state
    error InvalidState();

    /// Course doesn't exist
    error CourseIsNotCreated();

    //modifiers
    modifier onlyOwner(){
        //if msg.sender is the one who is current owner
        if(msg.sender != getContractOwner() ){
            revert OnlyOwner();
        }
        _;
    }

    constructor() {
        setContractOwner(msg.sender);
    } 

    function purchaseCourse (
        //get the id of course that we store in application
        bytes16 courseId,
        bytes32 proof // 0000000000000000000000000000313000000000000000000000000000003130
    ) external payable 
    {
        //construct course hash which we store in mapping Course hash will be mapped to course data
        //we use encodePacked when we need to hash multiple values
        //this will also allow user to purchase course only  once
        //Eg: course Id - 10 (Ascii of 10 - 3130(in hex))
        //      00000000000000000000000000003130
        //msg sender-  0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
        //  keccak256 - 0xc4eaa3558504e2baa2669001b43f359b8418b44a4477ff417b4b007d7cc86e37
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));

        if(hasCourseOwnership(courseHash)){
            revert CourseHasOwner();
        }
        uint id = totalOwnedCourses++;
        ownedCourseHash[id] = courseHash;
        //through course hash you'll be able to access course data
        ownedCourses[courseHash] = Course({
            id: id,
            price: msg.value,
            //proof will be sent along the transaction
            proof: proof, 
            owner: msg.sender,
            state: State.Purchased
        });
    }


    function repurchaseCourse(bytes32 courseHash) external payable {
        //we can repurchase the course if we are owners of the course
        //if sender is not owner then revert
        if(!isCourseCreated(courseHash)){
            revert CourseIsNotCreated();
        }

        if(!hasCourseOwnership(courseHash)){ 
            revert SenderIsNotCourseOwner();
        }

        Course storage course =  ownedCourses[courseHash];

        if(course.state!=State.Deactivated){
            revert InvalidState();
        }

        course.state = State.Purchased;
        course.price = msg.value;
    }

    function activateCourse(bytes32 courseHash) external onlyOwner {

        if(!isCourseCreated(courseHash)){
            revert CourseIsNotCreated();
        }
        //whenever we use storage, we can manipulate data
        //it will also change the data, in memory it will not happen
        Course storage course = ownedCourses[courseHash];
        //In order to activate course should exist and it should be purchased
        if(course.state != State.Purchased){
            revert InvalidState();
        }

        course.state = State.Activated;
    }


        function deactivateCourse(bytes32 courseHash) external onlyOwner {

        if(!isCourseCreated(courseHash)){
            revert CourseIsNotCreated();
        }
        //whenever we use storage, we can manipulate data
        //it will also change the data, in memory it will not happen
        Course storage course = ownedCourses[courseHash];
        //In order to activate course should exist and it should be purchased
        if(course.state != State.Purchased){
            revert InvalidState();
        } 

        //if price has miscrepancy, we can send back the money/ eth to the user
        (bool success,  ) = course.owner.call{value: course.price}("");
        require(success, "Transfer failed");
        course.state = State.Deactivated;
        course.price = 0;
    }


    function transferOwnership(address newOwner) external onlyOwner { 
        setContractOwner(newOwner);
    }
    
    function getCourseCount() external view returns (uint) {
        return totalOwnedCourses;
    }

    //it required index as parameter

    function getCourseHashAtIndex(uint index) external view returns (bytes32) {
        return ownedCourseHash[index];
    }

    //while returning struct specify memory
    function getCourseByHash(bytes32 courseHash) external view returns (Course memory) {
        return ownedCourses[courseHash];
    }

    function getContractOwner() public view returns (address) {
        return owner;
    }

    function setContractOwner(address newOwner) private {
        owner = payable(newOwner);
    }

    //helper function
    function hasCourseOwnership(bytes32 courseHash) private view returns (bool) {
        return ownedCourses[courseHash].owner == msg.sender;
    }

    function isCourseCreated(bytes32 courseHash) private view returns (bool) {
        return ownedCourses[courseHash].owner != 0x0000000000000000000000000000000000000000; 
    }
}