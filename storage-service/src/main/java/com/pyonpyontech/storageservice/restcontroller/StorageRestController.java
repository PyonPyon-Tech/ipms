package com.pyonpyontech.storageservice.restcontroller;

import com.pyonpyontech.storageservice.dto.FileUploadResponse;
import com.pyonpyontech.storageservice.service.StorageRestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/images")
public class StorageRestController {
  
  @Autowired
  private StorageRestService service;

  @PostMapping("/{outletId}/{technicianId}")
  public FileUploadResponse uploadFiles(@PathVariable String outletId, @PathVariable String technicianId, @RequestParam(value = "file") MultipartFile[] files) {
    
    if (files[0].isEmpty())
      throw new IllegalStateException("No files were uploaded");
    
    FileUploadResponse fileUploadResponse = new FileUploadResponse();
    
    for (MultipartFile file : files) {
      String uploadedFileName = service.uploadFile(file, outletId, technicianId);
      fileUploadResponse.getStatus()
                        .put(file.getOriginalFilename(), uploadedFileName);
      
      if (uploadedFileName.length() > 0)
        fileUploadResponse.setSuccessAmount(fileUploadResponse.getSuccessAmount() + 1);
    }
    System.out.println(fileUploadResponse.getStatus().keySet().toString());
    return fileUploadResponse;
  }

  @GetMapping("/{fileName}")
  public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String fileName) {
    byte[] data = service.downloadFile(fileName);
    ByteArrayResource resource = new ByteArrayResource(data);
    return ResponseEntity
      .ok()
      .contentLength(data.length)
      .header("Content-Type", "application/octet-stream")
      .header("Content-Disposition", "attachment; fileName=\"" + fileName + "\"")
      .body(resource);
  }

  @DeleteMapping("/{fileName}")
  public ResponseEntity<String> deleteFile(@PathVariable String fileName) {
    return new ResponseEntity<>(service.deleteFile(fileName), HttpStatus.OK);
  }
}