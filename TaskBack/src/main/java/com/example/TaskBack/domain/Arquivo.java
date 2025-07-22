package com.example.TaskBack.domain;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(schema = "Task", name = "Arquivo")
public class Arquivo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdArquivo")
    private Integer idArquivo;

    @Column(name = "nomeArquivo")
    private String nomeArquivo;

    @Column(name = "caminho")
    private String caminho;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdTarefa", referencedColumnName = "IdTarefa", nullable = false)
    private Tarefa tarefa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdUsuario", referencedColumnName = "IdUsuario", nullable = false)
    private Usuario enviadoPor;
}
