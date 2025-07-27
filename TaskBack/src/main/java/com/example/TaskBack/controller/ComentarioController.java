package com.example.TaskBack.controller;

import com.example.TaskBack.service.ComentarioService;
import com.example.TaskBack.service.DTO.ComentarioDTO;
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
@RequestMapping("api/comentario")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class ComentarioController {
    private final ComentarioService service;

    @GetMapping
    public ResponseEntity<List<ComentarioDTO>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{idComentario}")
    public ResponseEntity<ComentarioDTO> findByID(@PathVariable("idComentario") Integer idComentario) {
        return new ResponseEntity<>(service.findByID(idComentario), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ComentarioDTO> save(@RequestBody ComentarioDTO dto) {
        return new ResponseEntity<>(service.save(dto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{idComentario}")
    public ResponseEntity<Void> delete(@PathVariable("idComentario") Integer idComentario) {
        service.delete(idComentario);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
