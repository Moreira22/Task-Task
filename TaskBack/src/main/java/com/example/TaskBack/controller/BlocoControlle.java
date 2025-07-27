package com.example.TaskBack.controller;

import com.example.TaskBack.service.BlocoService;
import com.example.TaskBack.service.DTO.BlocoDTO;
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
@RequestMapping("api/bloco")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class BlocoControlle {
    private final BlocoService service;

    @GetMapping
    public ResponseEntity<List<BlocoDTO>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{idBloco}")
    public ResponseEntity<BlocoDTO> findByID(@PathVariable("idBloco") Integer idBloco) {
        return new ResponseEntity<>(service.findByID(idBloco), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<BlocoDTO> save(@RequestBody BlocoDTO dto) {
        return new ResponseEntity<>(service.save(dto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{idBloco}")
    public ResponseEntity<Void> delete(@PathVariable("idBloco") Integer idBloco) {
        service.delete(idBloco);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
