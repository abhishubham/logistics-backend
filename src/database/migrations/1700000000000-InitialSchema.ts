import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enum types
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user', 'driver', 'manager')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('active', 'inactive', 'suspended')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."parties_type_enum" AS ENUM('consignee', 'shipper', 'carrier', 'vendor')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."carriers_type_enum" AS ENUM('airline', 'shipping')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."ports_airports_type_enum" AS ENUM('port', 'airport')`,
    );

    // Create countries table
    await queryRunner.query(`
      CREATE TABLE "countries" (
        "country_id" SERIAL NOT NULL,
        "country_name" character varying NOT NULL,
        "country_code" character varying(3) NOT NULL,
        "capital" character varying,
        "currency" character varying,
        "language" character varying,
        "is_active" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_countries_country_name" UNIQUE ("country_name"),
        CONSTRAINT "UQ_countries_country_code" UNIQUE ("country_code"),
        CONSTRAINT "PK_countries" PRIMARY KEY ("country_id")
      )
    `);

    // Create cities table
    await queryRunner.query(`
      CREATE TABLE "cities" (
        "city_id" SERIAL NOT NULL,
        "city_name" character varying NOT NULL,
        "city_code" character varying NOT NULL,
        "country_id" integer NOT NULL,
        "is_active" boolean NOT NULL DEFAULT true,
        CONSTRAINT "UQ_cities_city_name" UNIQUE ("city_name"),
        CONSTRAINT "UQ_cities_city_code" UNIQUE ("city_code"),
        CONSTRAINT "PK_cities" PRIMARY KEY ("city_id")
      )
    `);

    // Create users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" character varying(255) NOT NULL,
        "password" character varying(255) NOT NULL,
        "firstName" character varying(100) NOT NULL,
        "lastName" character varying(100) NOT NULL,
        "phone" character varying(20),
        "role" "public"."users_role_enum" NOT NULL DEFAULT 'user',
        "status" "public"."users_status_enum" NOT NULL DEFAULT 'active',
        "avatar" character varying(500),
        "address" text,
        "city" character varying(100),
        "country" character varying(100),
        "postalCode" character varying(20),
        "dateOfBirth" date,
        "emailVerified" boolean NOT NULL DEFAULT false,
        "emailVerificationToken" character varying(255),
        "passwordResetToken" character varying(255),
        "passwordResetExpires" TIMESTAMP,
        "lastLoginAt" TIMESTAMP,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )
    `);

    // Create carriers table
    await queryRunner.query(`
      CREATE TABLE "carriers" (
        "carrier_id" SERIAL NOT NULL,
        "carrier_name" character varying NOT NULL,
        "carrier_code" character varying NOT NULL,
        "type" "public"."carriers_type_enum" NOT NULL,
        "is_active" boolean NOT NULL DEFAULT true,
        CONSTRAINT "UQ_carriers_carrier_name" UNIQUE ("carrier_name"),
        CONSTRAINT "UQ_carriers_carrier_code" UNIQUE ("carrier_code"),
        CONSTRAINT "PK_carriers" PRIMARY KEY ("carrier_id")
      )
    `);

    // Create commodities table
    await queryRunner.query(`
      CREATE TABLE "commodities" (
        "commodity_id" SERIAL NOT NULL,
        "commodity_name" character varying NOT NULL,
        "commodity_code" character varying NOT NULL,
        "category" character varying,
        "is_active" boolean NOT NULL DEFAULT true,
        CONSTRAINT "UQ_commodities_commodity_name" UNIQUE ("commodity_name"),
        CONSTRAINT "UQ_commodities_commodity_code" UNIQUE ("commodity_code"),
        CONSTRAINT "PK_commodities" PRIMARY KEY ("commodity_id")
      )
    `);

    // Create parties table
    await queryRunner.query(`
      CREATE TABLE "parties" (
        "party_id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "short_name" character varying,
        "type" "public"."parties_type_enum" NOT NULL,
        "billing_address" character varying,
        "corporate_address" character varying,
        "credit_limit" numeric(15,2) NOT NULL DEFAULT '0',
        "credit_days" integer NOT NULL DEFAULT '0',
        "tds_rate" numeric(5,2) NOT NULL DEFAULT '0',
        "tds_applicable" boolean NOT NULL DEFAULT false,
        "contact_person" character varying,
        "phone" character varying,
        "email" character varying,
        "created_date" TIMESTAMP NOT NULL DEFAULT now(),
        "is_active" boolean NOT NULL DEFAULT true,
        CONSTRAINT "PK_parties" PRIMARY KEY ("party_id")
      )
    `);

    // Create ports_airports table
    await queryRunner.query(`
      CREATE TABLE "ports_airports" (
        "port_id" SERIAL NOT NULL,
        "port_name" character varying NOT NULL,
        "port_code" character varying NOT NULL,
        "type" "public"."ports_airports_type_enum" NOT NULL,
        "city_id" integer NOT NULL,
        "is_active" boolean NOT NULL DEFAULT true,
        CONSTRAINT "UQ_ports_airports_port_name" UNIQUE ("port_name"),
        CONSTRAINT "UQ_ports_airports_port_code" UNIQUE ("port_code"),
        CONSTRAINT "PK_ports_airports" PRIMARY KEY ("port_id")
      )
    `);

    // Create foreign key constraints
    await queryRunner.query(`
      ALTER TABLE "cities" ADD CONSTRAINT "FK_cities_country" 
      FOREIGN KEY ("country_id") REFERENCES "countries"("country_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "ports_airports" ADD CONSTRAINT "FK_ports_airports_city" 
      FOREIGN KEY ("city_id") REFERENCES "cities"("city_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    // Create indexes
    await queryRunner.query(
      `CREATE INDEX "IDX_users_email" ON "users" ("email")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_users_role" ON "users" ("role")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_users_status" ON "users" ("status")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cities_country_id" ON "cities" ("country_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ports_airports_city_id" ON "ports_airports" ("city_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.query(`DROP INDEX "IDX_ports_airports_city_id"`);
    await queryRunner.query(`DROP INDEX "IDX_cities_country_id"`);
    await queryRunner.query(`DROP INDEX "IDX_users_status"`);
    await queryRunner.query(`DROP INDEX "IDX_users_role"`);
    await queryRunner.query(`DROP INDEX "IDX_users_email"`);

    // Drop foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "ports_airports" DROP CONSTRAINT "FK_ports_airports_city"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cities" DROP CONSTRAINT "FK_cities_country"`,
    );

    // Drop tables
    await queryRunner.query(`DROP TABLE "ports_airports"`);
    await queryRunner.query(`DROP TABLE "parties"`);
    await queryRunner.query(`DROP TABLE "commodities"`);
    await queryRunner.query(`DROP TABLE "carriers"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "cities"`);
    await queryRunner.query(`DROP TABLE "countries"`);

    // Drop enum types
    await queryRunner.query(`DROP TYPE "public"."ports_airports_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."carriers_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."parties_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
