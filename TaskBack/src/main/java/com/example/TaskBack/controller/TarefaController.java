package com.example.TaskBack.controller;

import com.example.TaskBack.service.TarefaService;
import com.example.TaskBack.service.DTO.TarefaDTO;
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
@RequestMapping("api/tarefa")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class TarefaController {
    private final TarefaService service;

    @GetMapping
    public ResponseEntity<List<TarefaDTO>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{idTarefa}")
    public ResponseEntity<TarefaDTO> findByID(@PathVariable("idTarefa") Integer idTarefa) {
        return new ResponseEntity<>(service.findByID(idTarefa), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TarefaDTO> save(@RequestBody TarefaDTO dto) {
        return new ResponseEntity<>(service.save(dto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{idTarefa}")
    public ResponseEntity<Void> delete(@PathVariable("idTarefa") Integer idTarefa) {
        service.delete(idTarefa);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
