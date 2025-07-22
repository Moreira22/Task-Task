package com.example.TaskBack.domain;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(schema = "Task", name = "Comentario")
public class Comentario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdComentario")
    private Integer idComentario;

    @Column(name = "conteudo")
    private String conteudo;

    @Column(name = "criadoEm")
    private Date criadoEm;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdUsuario", referencedColumnName = "IdUsuario", nullable = false)
    private Usuario criado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdTarefa", referencedColumnName = "IdTarefa", nullable = false)
    private Tarefa tarefa;

}
