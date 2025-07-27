package com.example.TaskBack.controller;

import com.example.TaskBack.service.ArquivoService;
import com.example.TaskBack.service.DTO.ArquivoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/arquivo")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class ArquivoController {
    private final ArquivoService service;

    @GetMapping
    public ResponseEntity<List<ArquivoDTO>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{idArquivo}")
    public ResponseEntity<ArquivoDTO> findByID(@PathVariable("idArquivo") Integer idArquivo) {
        return new ResponseEntity<>(service.findByID(idArquivo), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ArquivoDTO> save(@RequestBody ArquivoDTO dto) {
        return new ResponseEntity<>(service.save(dto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{idArquivo}")
    public ResponseEntity<Void> delete(@PathVariable("idArquivo") Integer idArquivo) {
        service.delete(idArquivo);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
