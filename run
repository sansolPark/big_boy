import pygame
import random

# 초기 설정
pygame.init()
WIDTH, HEIGHT = 800, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("닌자 고양이 런")
clock = pygame.time.Clock()
FONT = pygame.font.SysFont(None, 40)

# 색상
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# 고양이 캐릭터
player_img = pygame.image.load("cat_run_1.png")  # 달리기 모션 이미지
player_rect = player_img.get_rect(midbottom=(100, 300))
player_y_vel = 0
gravity = 1
is_jumping = False

# 장애물
obstacle_img = pygame.Surface((50, 50))
obstacle_img.fill((200, 50, 50))
obstacle_rects = []

# 배경
ground_y = 300
score = 0

# 게임 루프
running = True
while running:
    screen.fill(WHITE)

    # 이벤트 처리
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # 점프
    keys = pygame.key.get_pressed()
    if keys[pygame.K_SPACE] and not is_jumping:
        player_y_vel = -18
        is_jumping = True

    # 중력 적용
    player_y_vel += gravity
    player_rect.y += player_y_vel

    if player_rect.bottom >= ground_y:
        player_rect.bottom = ground_y
        is_jumping = False

    # 장애물 생성
    if random.randint(1, 60) == 1:
        new_rect = obstacle_img.get_rect(midbottom=(WIDTH, ground_y))
        obstacle_rects.append(new_rect)

    # 장애물 이동
    for rect in obstacle_rects:
        rect.x -= 5
    obstacle_rects = [r for r in obstacle_rects if r.right > 0]

    # 충돌 감지
    for rect in obstacle_rects:
        if player_rect.colliderect(rect):
            running = False

    # 점수 증가
    score += 1

    # 그리기
    screen.blit(player_img, player_rect)
    for rect in obstacle_rects:
        screen.blit(obstacle_img, rect)

    # 점수 표시
    score_surf = FONT.render(f"Score: {score}", True, BLACK)
    screen.blit(score_surf, (10, 10))

    pygame.display.update()
    clock.tick(60)

pygame.quit()
