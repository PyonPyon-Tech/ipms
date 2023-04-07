package com.pyonpyontech.storageservice.restcontroller;


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

    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam(value = "file") MultipartFile file) {
        return new ResponseEntity<>(service.uploadFile(file), HttpStatus.OK);
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