package com.example.TaskBack.service.DTO;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ComentarioDTO implements Serializable{
    private Integer idComentario;

    private String conteudo;

    private Date criadoEm;

    private Integer criado;

    private Integer tarefa;
}
