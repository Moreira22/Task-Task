package com.example.TaskBack.service.DTO;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArquivoDTO implements Serializable{
    private Integer idArquivo;

    private String nomeArquivo;

    private String caminho;

    private Integer tarefa;

    private Integer enviadoPor;
}
