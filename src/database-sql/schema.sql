-- Esses schemas estão de acordo com o schema.prisma, traduzidos para a sintaxe de SQL


-- Para a tabela de usuários:
CREATE TABLE users (
  id CHAR(36) NOT NULL, --diferentemente do enunciado, preferi usar o random uuid por melhores práticas de segurança
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY users_email_unique (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; -- Engine innoDB é a engine do MySQL utiliada pela imagem do docker

-- Para a tabela de tasks:
CREATE TABLE tasks (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  user_id CHAR(36) NOT NULL,

  PRIMARY KEY (id),
  CONSTRAINT tasks_user_id_fk
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
