CREATE TABLE pessoas(
   idPessoa INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
   nome varchar(100),
   cpf varchar(20),
   dataNascimento DATE
);

CREATE TABLE contas(
   idConta INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
   idPessoa INT,
   saldo DOUBLE DEFAULT 0.0,
   limiteSaqueDiario DOUBLE DEFAULT 1000.0,
   flagAtivo BOOLEAN DEFAULT FALSE,
   tipoConta INT DEFAULT 1,
   dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY(idPessoa) REFERENCES pessoas(idPessoa)
);

CREATE TABLE transacoes(
   idTransacao INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
   idConta INT,
   valor DOUBLE,
   dataTransacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY(idConta) REFERENCES contas(idConta)
);