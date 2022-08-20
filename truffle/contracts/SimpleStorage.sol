// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
  uint public fileCount=0;
  mapping (uint=>File) public Files;
  struct File{
    uint id;
    string fileName;
    string desc;
    uint fileSize;
    string fileHash;
    address payable uploader;
  }
  event file_uploaded(
     uint id,
    string fileName,
    string desc,
    uint fileSize,
    string fileHash,
    address payable uploader
  );
  function uploadFile(string memory _fileName,string memory _desc,uint _fileSize,string memory _fileHash) public{
    require(bytes(_fileHash).length>0);
    fileCount++;
    Files[fileCount]=File(fileCount,_fileName,_desc,_fileSize,_fileHash,payable(msg.sender));
    emit file_uploaded(fileCount,_fileName,_desc,_fileSize,_fileHash,payable(msg.sender));
  }
  

}
