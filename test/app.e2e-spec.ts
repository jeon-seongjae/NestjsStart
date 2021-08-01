import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {  // beforeEach 를 beforeAll로 바꾼다 테스트마다 새로운 앱을 만드는 걸 막기 위해서
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication(); // 테스트를 할때 여기서 새로 app을 생성하는 데 어떠한 파이프도 없음 그래서 타입이 맞지 않는 오류가 발생
    // 그래서 main.ts 실제 환경처럼 밑에 꺼를 추가해야함 
    // 테스팅 어플리케이션과 실제 어플리케이션은 별개 그래서 테스트를 정확히 하려면 테스트 어플리케이션도 실제 어플리케이션 처럼 환경을 맞춰줘야 한다.
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true 
      }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe("/movies", () => {
    it("GET", () => {
      return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect(`[]`);
    })
    it("POST 201", () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title : "je",
        year : 2020,
        genres : ["test"],
      })
      .expect(201)
    })
    it("POST 400", () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title : "je",
        year : 2020,
        genres : ["test"],
        other: "thing"
      })
      .expect(400)
    })
    it("DELETE", () => {
      return request(app.getHttpServer())
      .delete('/movies')
      .expect(404)
    })
  })

  describe("/movies/:id", () => { 
    // it.todo("GET"),
    // it.todo("DELETE"),
    // it.todo("PATCH")
    it("GET 200", () => {
      return request(app.getHttpServer())
      .get("/movies/1")
      .expect(200)
    })
    it("GET 404", () => {
      return request(app.getHttpServer())
      .get("/movies/2")
      .expect(404)
    })
    it("PATCH 200", () => {
      return request(app.getHttpServer())
      .patch("/movies/1")
      .send({
        title : "interstalla"
      })
      .expect(200)
    })
    it("DELETE 200", () => {
      return request(app.getHttpServer())
      .delete("/movies/1")
      .expect(200)
    })
  })
});
