CREATE TABLE users (
    id int(11) NOT NULL auto_increment,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    created_date date NOT NULL,
    updated_date date NOT NULL,
    PRIMARY KEY (id)
);