CREATE TABLE IF NOT EXISTS { { routes } } (
    id INT PRIMARY KEY AUTO_INCREMENT,
    route VARCHAR(255) NOT NULL
) ENGINE = InnoDB;
CREATE TABLE IF NOT EXISTS { { index } } (
    id INT PRIMARY KEY AUTO_INCREMENT,
    route_id INT NOT NULL,
    index_term VARCHAR(255) NOT NULL,
    FOREIGN KEY (route_id) REFERENCES { { routes } }(id)
) ENGINE = InnoDB;