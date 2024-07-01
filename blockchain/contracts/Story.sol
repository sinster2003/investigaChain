// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Story {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // events for off-chain actions
    event StoryAdded(string storyId, address authorId, string[] patterns);
    event StoryUpdated(string storyId, address authorId, string[] patterns);

    struct StoryObject {
        string storyId;
        bytes32 storyContent;
        address authorId;
        string[] patterns;
    }

    // mapping with key storyId and value the StoryObject
    mapping (string => StoryObject) private stories;
    
    // custom modifier to check if the message sender is the author or not
    modifier onlyCreator(string memory storyId) {
        require(stories[storyId].authorId != address(0), "Story does not exist");
        require(msg.sender == stories[storyId].authorId, "Caller is not the author of this story.");
        _;
    }

    // add story along with hash and authorId
    function addStory(string memory storyId, bytes32 storyContent, address authorId, string[] memory patterns) public {
        require(stories[storyId].storyContent == 0, "Story with the same storyId already exists.");
        require(stories[storyId].authorId == address(0), "Story with the same storyId already exists.");
        stories[storyId] = StoryObject(storyId, storyContent, authorId, patterns);
        emit StoryAdded(storyId, authorId, patterns);
    }

    // checks if original author then proceeds to update
    function updateStory(string memory storyId, bytes32 storyContent, address authorId, string[] memory patterns) public onlyCreator(storyId){
        require(stories[storyId].storyContent != 0, "Story does not exist.");
        require(stories[storyId].authorId != address(0), "Story does not exist");
        stories[storyId] = StoryObject(storyId, storyContent, authorId, patterns);
        emit StoryUpdated(storyId, authorId, patterns);
    }

    function getStory(string memory storyId) view public returns (StoryObject memory){
        return stories[storyId];
    }
}  