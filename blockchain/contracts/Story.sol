// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Story {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // events for off-chain actions
    event StoryAdded(string storyId, address authorId);
    event StoryUpdated(string storyId, address authorId);

    struct StoryObject {
        string storyId;
        bytes32 storyContent;
        address authorId;
    }

    // mapping with key storyId and value the StoryObject
    mapping (string => StoryObject) private stories;
    
    // custom modifier to check if the message sender is the author or not
    modifier onlyCreator(string memory storyId, address authorId) {
        require(stories[storyId].authorId != address(0), "Story does not exist");
        require(authorId == stories[storyId].authorId, "Caller is not the author of this story.");
        _;
    }

    // add story along with hash and authorId
    function addStory(string memory storyId, bytes32 storyContent, address authorId) public {
        require(stories[storyId].storyContent == 0, "Story with the same storyId already exists.");
        require(stories[storyId].authorId == address(0), "Story with the same storyId already exists.");
        stories[storyId] = StoryObject(storyId, storyContent, authorId);
        emit StoryAdded(storyId, authorId);
    }

    // checks if original author then proceeds to update
    function updateStory(string memory storyId, bytes32 storyContent, address authorId) public onlyCreator(storyId, authorId){
        require(stories[storyId].storyContent != 0, "Story does not exist.");
        require(stories[storyId].authorId != address(0), "Story does not exist");
        stories[storyId] = StoryObject(storyId, storyContent, authorId);
        emit StoryUpdated(storyId, authorId);
    }

    function getStory(string memory storyId) view public returns (StoryObject memory){
        return stories[storyId];
    }
}  