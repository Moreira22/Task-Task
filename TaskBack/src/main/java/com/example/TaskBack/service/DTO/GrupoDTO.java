package com.example.TaskBack.service.DTO;

import com.example.TaskBack.domain.Usuario;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class GrupoDTO implements Serializable{
    private Integer idGrupo;

    private String nome;

    private List<Usuario> usuarios;

    public GrupoDTO(Integer idGrupo, String nome, List<Usuario> usuarios) {
        this.idGrupo = idGrupo;
        this.nome = nome;
        this.usuarios = usuarios;
    }
}
