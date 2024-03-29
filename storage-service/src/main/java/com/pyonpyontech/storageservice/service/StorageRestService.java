package com.pyonpyontech.storageservice.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import lombok.extern.slf4j.Slf4j;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.Base64Utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import java.util.UUID;
import java.util.NoSuchElementException;

@Service
@Slf4j
public class StorageRestService {

  @Value("${application.bucket.name}")
  private String bucketName;

  @Autowired
  private AmazonS3 s3Client;
  
  private static final Logger logger = LoggerFactory.getLogger(StorageRestService.class);

  public String uploadFile(MultipartFile file, String outletId, String technicianId) {
    File fileObj = convertMultiPartFileToFile(file);
    String originalFileName = file.getOriginalFilename();
    
    if (!originalFileName.contains("."))
      return "";
    
    String fileName = outletId + "/"
                      + technicianId + "/"
                      + System.currentTimeMillis() + "-"
                      + UUID.randomUUID().toString()
                      + originalFileName
                        .substring(originalFileName.lastIndexOf("."))
                        .toLowerCase();
    
    try { 
      s3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObj));
    } catch (AmazonS3Exception e) {
      logger.error(e.getMessage());
      return "";
    } finally {
      fileObj.delete();
    }
    
    logger.info("File uploaded: " + fileName);
    
    return fileName;
  }

  public String downloadFile(String fileName) {
    S3Object s3Object = s3Client.getObject(bucketName, fileName);
    S3ObjectInputStream inputStream = s3Object.getObjectContent();
    
    try {
      byte[] content = IOUtils.toByteArray(inputStream);
      logger.info("File downloaded: " + fileName);
      
      return new String(Base64Utils.encode(content));
    } catch (IOException e) {
      e.printStackTrace();
    }
    
    return null;
  }

  public String deleteFile(String fileName) {
    if (!s3Client.doesObjectExist(bucketName, fileName)) {
      logger.warn("File to delete not found: " + fileName);
      throw new NoSuchElementException("File not found: " + fileName);
    }
    
    s3Client.deleteObject(bucketName, fileName);
    
    logger.info("File deleted: " + fileName);
    
    return fileName;
  }

  private File convertMultiPartFileToFile(MultipartFile file) {
    File convertedFile = new File(file.getOriginalFilename());
    
    try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
      fos.write(file.getBytes());
    } catch (IOException e) {
      log.error("Error converting multipartFile to file", e);
    }
    
    return convertedFile;
  }
  
}