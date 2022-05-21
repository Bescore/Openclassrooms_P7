/*table_utilisateurs*/

CREATE TABLE utilisateurs(  
    idutilisateurs int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    nom VARCHAR(255) ,
    prenom VARCHAR(255) ,
    md_passe VARCHAR(255) ,
    email VARCHAR(255) UNIQUE ,
    photo VARCHAR(500) ,
    active int(1) ,
    isAdmin int(1),
    create_time DATETIME COMMENT 'Create Time',
    update_time DATETIME COMMENT 'Update Time'
);

/*table posts*/

CREATE TABLE posts(  
    idposts int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    post_body TEXT ,
    post_img VARCHAR(255) ,
    titre VARCHAR(255),
    idutilisateurs INT NOT NULL,
    CONSTRAINT fk_idutilisateurs FOREIGN KEY (idutilisateurs) REFERENCES utilisateurs(idutilisateurs) ON DELETE CASCADE,
    create_time DATETIME COMMENT 'Create Time',
    update_time DATETIME COMMENT 'Update Time',
    content VARCHAR(255) COMMENT 'content'
);

/*commentaires*/

CREATE TABLE comments(  
    idcomments int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    commentaires VARCHAR(255),
    com_idutilisateurs int NOT NULL,
    com_idposts int NOT NULL,
    dates DATETIME,
    create_time DATETIME COMMENT 'Create Time',
    update_time DATETIME COMMENT 'Update Time',
    content VARCHAR(255) COMMENT 'content'
);

/*ajout foreygn commentaires*/
ALTER TABLE comments
ADD CONSTRAINT fk_com_idutilisateurs
FOREIGN KEY (com_idutilisateurs) REFERENCES utilisateurs(idutilisateurs) ON DELETE CASCADE,
ADD CONSTRAINT fk_com_idposts
FOREIGN KEY (com_idposts) REFERENCES posts(idposts) ON DELETE CASCADE;



/*likes des posts*/

CREATE TABLE likes(  
    idlikes int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME COMMENT 'Create Time',
    update_time DATETIME COMMENT 'Update Time',
    nombre_like int ,
    nombre_dislike int,
    idposts int NOT NULL,
    CONSTRAINT fk_idposts FOREIGN KEY (idposts) REFERENCES posts(idposts) ON DELETE CASCADE
);



/*effacer les FOREIGN*/
ALTER TABLE  comments
DROP FOREIGN KEY fk_com_idposts;