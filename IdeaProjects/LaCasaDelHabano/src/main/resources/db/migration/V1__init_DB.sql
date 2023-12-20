drop table if exists basket CASCADE;
drop table if exists telegram CASCADE;
drop table if exists feedback CASCADE;
drop table if exists item CASCADE;
drop table if exists item_option CASCADE;
drop table if exists links CASCADE;
drop table if exists news CASCADE;
drop table if exists reserve CASCADE;
drop table if exists registration_of_wholesale_customer CASCADE;
drop table if exists users cascade;
drop sequence if exists seq_users;
drop sequence if exists seq_telegrams;
drop sequence if exists seq_basket;
drop sequence if exists seq_feedback;
drop sequence if exists seq_item;
drop sequence if exists seq_links;
drop sequence if exists seq_news;
drop sequence if exists seq_reserve;
drop sequence if exists seq_registration_of_wholesale_customer;
create sequence seq_users start with 1 increment by 1;
create sequence seq_telegrams start with 1 increment by 1;
create sequence seq_feedback start with 1 increment by 1;
create sequence seq_item start with 100000 increment by 1;
create sequence seq_links start with 1 increment by 1;
create sequence seq_news start with 100000 increment by 1;
create sequence seq_reserve start with 1 increment by 1;
create sequence seq_basket start with 1 increment by 1;
create sequence seq_registration_of_wholesale_customer start with 1 increment by 1;

create table feedback
(
    id           bigint not null,
    datetime     TIMESTAMP,
    message      varchar(255),
    name         varchar(255),
    tel_or_email varchar(255),
    primary key (id)
);
create table telegram
(
    id           bigint not null,
    telegram_id  bigint,
    primary key (id)
);
create table registration_of_wholesale_customer
(
    id                   bigint not null,
    datetime             TIMESTAMP,
    message              varchar(255),
    name                 varchar(255),
    name_of_organization varchar(255),
    city                 varchar(255),
    subject_of_letter    varchar(255),
    tel_or_email         varchar(255),
    primary key (id)
);
create table item
(
    id                        bigint  not null,
    article_number            varchar(255),
    brand                     varchar(255),
    country                   varchar(255),
    description               CLOB,
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
    en_lang_description       CLOB,
    en_lang_name              varchar(255),
    en_lang_series            varchar(255),
    en_lang_type_of_accessory varchar(255),
    primary key (id)
);
create table item_option
(
    item_id      bigint       not null,
    option_value integer,
    option_key   varchar(255) not null,
    primary key (item_id, option_key)
);
create table item_option_en
(
    item_id         bigint       not null,
    option_value_en integer,
    option_key_en   varchar(255) not null,
    primary key (item_id, option_key_en)
);
create table links
(
    id                             bigint not null,
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
    petrogradskoy_telephony_mobile varchar(255),
    primary key (id)
);
create table news
(
    id                bigint not null,
    date              date,
    header            varchar(255),
    main_text         CLOB,
    tag               varchar(400),
    en_lang_header    varchar(255),
    en_lang_main_text CLOB,
    en_lang_tag       varchar(400),
    photo             varchar(500),
    primary key (id)
);
create table reserve
(
    id               bigint not null,
    datetime         DATE,
    message          varchar(300),
    mug              varchar(255),
    type             varchar(255),
    news_name        varchar(255),
    name             varchar(255),
    number_of_guests integer,
    tel_or_email     varchar(255),
    primary key (id)
);

create table basket
(
    id              bigint not null,
    reserve_id      bigint,
    item_identifier bigint,
    item_name       varchar(255),
    item_option     varchar(255),
    item_price      integer,
    item_photo      varchar(500),
    primary key (id)
);


create table users
(
    id              bigint  not null,
    username        varchar(255) not null,
    password        varchar(255) not null,
    role            varchar(50),
    primary key (id)
);
alter table item_option
    add constraint FKpiufbijq6m8l18jf9a0nwny62 foreign key (item_id) references item;
alter table basket
    add constraint FKa6brf1grgtf9g48bdkmc075k6 foreign key (reserve_id) references reserve;
