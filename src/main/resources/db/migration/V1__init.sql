CREATE TABLE users(
    user_id bigserial primary key,
    username varchar(50) not null unique,
    password varchar(255) not null
);
CREATE TABLE tasks(
    task_id bigserial primary key,
    title varchar(50) not null,
    description varchar(200),
    status varchar(20) not null,
    user_id bigint not null,
    foreign key (user_id) references users(user_id) on delete cascade
);