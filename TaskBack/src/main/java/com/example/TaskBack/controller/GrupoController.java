package com.example.TaskBack.controller;

import com.example.TaskBack.service.DTO.GrupoDTO;
import com.example.TaskBack.service.GrupoService;
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
@RequestMapping("api/grupo")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class GrupoController {
    private final GrupoService service;

    @GetMapping
    public ResponseEntity<List<GrupoDTO>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{idGrupo}")
    public ResponseEntity<GrupoDTO> findByID(@PathVariable("idGrupo") Integer idGrupo) {
        return new ResponseEntity<>(service.findByID(idGrupo), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<GrupoDTO> save(@RequestBody GrupoDTO dto) {
        return new ResponseEntity<>(service.save(dto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{idGrupo}")
    public ResponseEntity<Void> delete(@PathVariable("idGrupo") Integer idGrupo) {
        service.delete(idGrupo);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
