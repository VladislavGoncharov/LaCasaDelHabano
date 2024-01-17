drop table if exists basket;
drop table if exists telegram;
drop table if exists feedback;
drop table if exists item;
drop table if exists item_option;
drop table if exists links;
drop table if exists news;
drop table if exists reserve;
drop table if exists registration_of_wholesale_customer;
drop table if exists users;

create table feedback
(
    id           BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    datetime     TIMESTAMP,
    message      varchar(255),
    name         varchar(255),
    tel_or_email varchar(255)
) AUTO_INCREMENT = 1;
create table telegram
(
    id          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    telegram_id bigint
) AUTO_INCREMENT = 1;
create table registration_of_wholesale_customer
(
    id                   BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    datetime             TIMESTAMP,
    message              varchar(255),
    name                 varchar(255),
    name_of_organization varchar(255),
    city                 varchar(255),
    subject_of_letter    varchar(255),
    tel_or_email         varchar(255)
) AUTO_INCREMENT = 1;
create table item
(
    id                        BIGINT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    article_number            varchar(255),
    brand                     varchar(255),
    country                   varchar(255),
    description               LONGTEXT,
    fortress                  integer,
    name                      varchar(255),
    photo                     varchar(500),
    photo_small               varchar(500),
    price                     integer not null,
    ring_gauge                integer,
    series                    varchar(255),
    size                      integer,
    type                      varchar(255),
    type_of_accessory         varchar(255),

    en_lang_brand             varchar(255),
    en_lang_country           varchar(255),
    en_lang_description       LONGTEXT,
    en_lang_name              varchar(255),
    en_lang_series            varchar(255),
    en_lang_type_of_accessory varchar(255)
) AUTO_INCREMENT = 100000;
create table item_option
(
    item_id      BIGINT       NOT NULL AUTO_INCREMENT,
    option_value integer,
    option_key   varchar(255) not null,
    primary key (item_id, option_key)
) AUTO_INCREMENT = 1;
create table item_option_en
(
    item_id         BIGINT       NOT NULL AUTO_INCREMENT,
    option_value_en integer,
    option_key_en   varchar(255) not null,
    primary key (item_id, option_key_en)
) AUTO_INCREMENT = 1;
create table links
(
    id                             BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    kuznechny_telephony_house      varchar(255),
    kuznechny_telephony_mobile     varchar(255),
    link_cuba_day                  varchar(500),
    link_cuba_restaurant           varchar(500),
    link_developers                varchar(500),
    linkfb                         varchar(500),
    linkinst                       varchar(500),
    link_mail                      varchar(500),
    linktlg                        varchar(500),
    linkvk                         varchar(500),
    petrogradskoy_telephony_house  varchar(255),
    petrogradskoy_telephony_mobile varchar(255)
) AUTO_INCREMENT = 1;
create table news
(
    id                BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date              date,
    header            varchar(255),
    main_text         LONGTEXT,
    tag               varchar(400),
    en_lang_header    varchar(255),
    en_lang_main_text LONGTEXT,
    en_lang_tag       varchar(400),
    photo             varchar(500)
) AUTO_INCREMENT = 100000;
create table reserve
(
    id               BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    datetime         DATE,
    message          varchar(300),
    mug              varchar(255),
    type             varchar(255),
    news_name        varchar(255),
    name             varchar(255),
    number_of_guests integer,
    tel_or_email     varchar(255)
) AUTO_INCREMENT = 1;

create table basket
(
    id              BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    reserve_id      bigint,
    item_identifier bigint,
    item_name       varchar(255),
    item_option     varchar(255),
    item_price      integer,
    item_photo      varchar(500)
) AUTO_INCREMENT = 1;


create table users
(
    id       BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username varchar(255) not null,
    password varchar(255) not null,
    role     varchar(50)
) AUTO_INCREMENT = 1;

alter table item_option add constraint FKpiufbijq6m8l18jf9a0nwny62 foreign key (item_id) references item(id);
alter table basket add constraint FKa6brf1grgtf9g48bdkmc075k6 foreign key (reserve_id) references reserve(id);
