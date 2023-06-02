// SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0 < 0.9.0;

contract Registration{
    address public Admin;
    uint public totalLandInspectors;

    struct LandInspector{
        address landInspectorAddress;
        string city;
        string district;
        string state;
    }

    struct PropertyDetails{
        address owner;
        address landInspector;
        uint256 propertyID;
        uint propertyPrice;
        uint surveyNumber;
        uint carpetArea;
        bool isRegistered;
        bool isAvailable;
        mapping(uint => RequestDetails) requests;
        uint totalRequests;
        uint index;
    }

    struct User{
        address userAddress;
        string name;
        string gender;
        string emailAddress;
        uint256 contactNumber;
        string residentialAddress;
        uint totalIndices;
        uint requestIndices;
    }
    
      struct OwnerOwned{
        uint surveyNumber;
        string state;
        string district;
        string city;
    }
    
    struct RequestedProperty{
        uint surveyNumber;
        string state;
        string district;
        string city;
    }

    struct RequestDetails{
        address requestedUser;
        uint requestIndex;
    }

    mapping(address => LandInspector) public landInspectors;
    mapping(address => mapping(uint => OwnerOwned)) public ownerMapsProperty;// ownerAddr => index no. => OwnerOwns 
    mapping(address => mapping(uint => RequestedProperty)) public requestedProperty;// ownerAddr => requestIndex => RequestedProperty
    mapping(string => mapping(string => mapping(string => mapping(uint => PropertyDetails)))) public landDetailsMap;// state => district => city => surveyNo => LandDetails
    mapping(address => User) public user;

    constructor(){
        Admin = msg.sender;
    }

    //Here, if the address of the user matches with the address of the landInspector then function can continue
    modifier onlyLandInspector(){
        require(landInspectors[msg.sender].landInspectorAddress == msg.sender, "Only admin can Register land");
        _;
    }

    //Here, Admin registers landInspector
    function addLandInspector(address _landInspectorAddr, string memory _city, string memory _district, string memory _state) public{
        LandInspector storage newLandInspector = landInspectors[_landInspectorAddr];
        totalLandInspectors++;

        newLandInspector.landInspectorAddress = _landInspectorAddr;
        //newLandInspector.name = _name;
        newLandInspector.city = _city;
        newLandInspector.district = _district;
        newLandInspector.state = _state;
    }

    //Here, we are checking if the landInspector is valid
    function isLandInspector() public view returns(bool){
        if(landInspectors[msg.sender].landInspectorAddress == msg.sender){
            return true;
        }
        else return false;
    }

    function propertyRegistry(string memory _state, string memory _district, string memory _city, uint256 _propertyID , uint _surveyNumber, address _owner, uint _propertyPrice, uint _carpetArea) public onlyLandInspector{

        //keccak256 is used to encrypt data into hash
        // require(keccak256(abi.encodePacked(landInspectors[msg.sender].state)) == keccak256(abi.encodePacked(_state))  
        // && keccak256(abi.encodePacked(landInspectors[msg.sender].district)) == keccak256(abi.encodePacked(_district))
        // && keccak256(abi.encodePacked(landInspectors[msg.sender].city)) == keccak256(abi.encodePacked(_city)), "LandInspector can only register property of same city.");

        //Here, the registration of land for same survey number cannot be done
        require(landDetailsMap[_state][_district][_city][_surveyNumber].isRegistered == false, "Registration of this survey number is already done");  


        PropertyDetails storage newRegistration = landDetailsMap[_state][_district][_city][_surveyNumber];
        OwnerOwned storage newOwnerOwned = ownerMapsProperty[_owner][user[_owner].totalIndices];


        newRegistration.owner = _owner;
        newRegistration.landInspector = msg.sender;
        newRegistration.surveyNumber = _surveyNumber;
        newRegistration.propertyID = _propertyID;
        newRegistration.index = user[_owner].totalIndices;
        newRegistration.propertyPrice = _propertyPrice;
        newRegistration.carpetArea = _carpetArea;
        newRegistration.isRegistered = true;
        newRegistration.isAvailable = false;

        newOwnerOwned.surveyNumber = _surveyNumber;
        newOwnerOwned.state = _state;
        newOwnerOwned.district = _district;
        newOwnerOwned.city = _city;

        user[_owner].totalIndices++;
    }

    
    // User Registration
    function userRegistration(string memory _name, string memory _gender, string memory _emailAddress, uint256 _contactNumber, string memory _residentialAddress /*,uint _aadharNumber*/) public{

        User storage newUser = user[msg.sender];

        newUser.name = _name;
        newUser.gender = _gender;
        newUser.emailAddress = _emailAddress;
        newUser.contactNumber = _contactNumber;
        newUser.residentialAddress = _residentialAddress;
        //newUser.aadharNumber = _aadharNumber;
    }

// User/owner marks their property available
    function markAvailable(uint indexNo) public {
        
        uint surveyNumber = ownerMapsProperty[msg.sender][indexNo].surveyNumber; 
        string memory state = ownerMapsProperty[msg.sender][indexNo].state;
        string memory district = ownerMapsProperty[msg.sender][indexNo].district;
        string memory city = ownerMapsProperty[msg.sender][indexNo].city;
        

        require(landDetailsMap[state][district][city][surveyNumber].isAvailable == false, "This property is already marked available");

        landDetailsMap[state][district][city][surveyNumber].isAvailable = true;
    }

    //user request the land to buy that he is interested in
    function RequestProperty(string memory _state, string memory _district, string memory _city, uint _surveyNumber)public {

        PropertyDetails storage currentPropertyDetail = landDetailsMap[_state][_district][_city][_surveyNumber];
        require(currentPropertyDetail.isAvailable  == true,"This property is not availablefor sale");


        uint requestNumber = currentPropertyDetail.totalRequests;
        currentPropertyDetail.requests[requestNumber].requestedUser = msg.sender;
        currentPropertyDetail.requests[requestNumber].requestIndex = user[msg.sender].requestIndices;
        currentPropertyDetail.totalRequests++;

        // adding requested land to user_2 profile
        RequestedProperty storage newRequestedProperty = requestedProperty[msg.sender][user[msg.sender].requestIndices];
        newRequestedProperty.surveyNumber = _surveyNumber;
        newRequestedProperty.state = _state;
        newRequestedProperty.district = _district;
        newRequestedProperty.city = _city;

        user[msg.sender].requestIndices++;
    }

    function RequestAccept(uint _indexNumber,uint _requestNumber)public{

        uint _surveyNumber = ownerMapsProperty[msg.sender][_indexNumber].surveyNumber;
        string memory _state = ownerMapsProperty[msg.sender][_indexNumber].state;
        string memory _district = ownerMapsProperty[msg.sender][_indexNumber].district;
        string memory _city = ownerMapsProperty[msg.sender][_indexNumber].city;

        address newBuyer = landDetailsMap[_state][_district][_city][_surveyNumber].requests[_requestNumber].requestedUser;
        //uint newBuyer_requestIndex = landDetailsMap[_state][_district][_city][_surveyNumber].requests[_requestNumber].requestIndex;
        uint totalReq = landDetailsMap[_state][_district][_city][_surveyNumber].totalRequests;


        // deleting requested land from all requesters AND removing all incoming requests
        for(uint i=0; i<totalReq;i++){
            address addrOfRequester = landDetailsMap[_state][_district][_city][_surveyNumber].requests[i].requestedUser;
            uint requestIndexOfRequester = landDetailsMap[_state][_district][_city][_surveyNumber].requests[i].requestIndex;

            delete requestedProperty[addrOfRequester][requestIndexOfRequester];
            delete landDetailsMap[_state][_district][_city][_surveyNumber].requests[i];
        }

        landDetailsMap[_state][_district][_city][_surveyNumber].owner = newBuyer;
        landDetailsMap[_state][_district][_city][_surveyNumber].isAvailable = false;
        landDetailsMap[_state][_district][_city][_surveyNumber].totalRequests = 0;

        delete ownerMapsProperty[msg.sender][_indexNumber];

        uint newOwnerProperty = user[newBuyer].totalIndices;
        OwnerOwned storage newOwnerOwned = ownerMapsProperty[newBuyer][newOwnerProperty];

        newOwnerOwned.surveyNumber = _surveyNumber;
        newOwnerOwned.state = _state;
        newOwnerOwned.district = _district;
        newOwnerOwned.city = _city;

        landDetailsMap[_state][_district][_city][_surveyNumber].index = newOwnerProperty;

        user[newBuyer].totalIndices++;
    }

    function extractPropertyDetails(string memory _state, string memory _district, string memory _city, uint _surveyNumber)public view returns(address,uint256,uint,uint,uint){

        address owner = landDetailsMap[_state][_district][_city][_surveyNumber].owner;
        uint256 propertyId = landDetailsMap[_state][_district][_city][_surveyNumber].propertyID;
        uint index = landDetailsMap[_state][_district][_city][_surveyNumber].index;
        uint price = landDetailsMap[_state][_district][_city][_surveyNumber].propertyPrice;
        uint area = landDetailsMap[_state][_district][_city][_surveyNumber].carpetArea;

        return(owner, propertyId, index, price, area);
    }

    function extractRequestCount(string memory _state, string memory _district, string memory _city, uint _surveyNumber) public view returns(uint, uint256){

        uint _totalRequests = landDetailsMap[_state][_district][_city][_surveyNumber].totalRequests;
        uint256 _propertyID = landDetailsMap[_state][_district][_city][_surveyNumber].propertyID;
        return(_totalRequests, _propertyID);
    }

    function extractRequester(string memory _state, string memory _district, string memory _city, uint _surveyNumber, uint _requestIndex) public view returns(address){
        address requester = landDetailsMap[_state][_district][_city][_surveyNumber].requests[_requestIndex].requestedUser;
        return(requester);
    }

    function isAvailable(string memory _state, string memory _district, string memory _city, uint _surveyNumber)public view returns(bool){
        bool isavailable = landDetailsMap[_state][_district][_city][_surveyNumber].isAvailable;
        return(isavailable);
    }

    function extractOwnerOwned(uint index) public view returns(string memory, string memory, string memory, uint){

        uint surveyNumber = ownerMapsProperty[msg.sender][index].surveyNumber;
        string memory state = ownerMapsProperty[msg.sender][index].state;
        string memory district = ownerMapsProperty[msg.sender][index].district;
        string memory city = ownerMapsProperty[msg.sender][index].city;

        return(state, district, city, surveyNumber);
    } 

    function extractRequestedProperty(uint index) public view returns(string memory, string memory, string memory, uint){

        uint surveyNumber = requestedProperty[msg.sender][index].surveyNumber;
        string memory state = requestedProperty[msg.sender][index].state;
        string memory district = requestedProperty[msg.sender][index].district;
        string memory city = requestedProperty[msg.sender][index].city;

        return(state, district, city, surveyNumber);
    }

    function extractUser()public view returns(string memory, string memory, string memory, uint256, string memory){

        string memory name = user[msg.sender].name;
        string memory gender = user[msg.sender].gender;
        string memory emailAddress = user[msg.sender].emailAddress;
        uint256 contactNumber = user[msg.sender].contactNumber;
        string memory residentialAddress = user[msg.sender].residentialAddress;

        return(name, gender, emailAddress, contactNumber, residentialAddress);
    }

    function extractIndices() public view returns(uint, uint){

        uint _noOfIndices = user[msg.sender].totalIndices;
        uint _requestIndices = user[msg.sender].requestIndices;

        return(_noOfIndices, _requestIndices);
    }

    function haveRequested(string memory _state, string memory _district, string memory _city, uint _surveyNumber) public view returns(bool){

        PropertyDetails storage currentPropertyDetail = landDetailsMap[_state][_district][_city][_surveyNumber];
        uint _totalRequests = currentPropertyDetail.totalRequests;

        if(_totalRequests == 0){
            return (false);
        }

        for(uint i=0; i<_totalRequests; i++){
            if(currentPropertyDetail.requests[i].requestedUser ==  msg.sender){
                return (true);
            }
        }

        return (false);
    }


}
