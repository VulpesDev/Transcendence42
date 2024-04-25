from django.shortcuts import render
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from .forms import MyUserCreationForm
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import PongGame, TTTGame, User, TournamentTable, TournamentProgress

users = [
    {"id": 1, "username": "user1", "email": "user1@example.com", "password": "user1","bio": "I am a software developer", "field_color": "blue"},
    {"id": 2, "username": "user2", "email": "user2@example.com", "password": "user2","bio": "I am a software developer", "field_color": "white"},
    {"id": 2, "username": "elias", "email": "elias", "password": "elias", "bio": "I am a software developer", "field_color": "green"},
]

    # Players who lose get their status set to "0"
tournament_players = [
    {"id": 0, "name": "user0", "status": 0},
    {"id": 1, "name": "user1", "status": 1},
    {"id": 2, "name": "user2", "status": 1},
    {"id": 3, "name": "user3", "status": 1},
    {"id": 4, "name": "user4", "status": 1},
    {"id": 5, "name": "user5", "status": 1},
    {"id": 6, "name": "user6", "status": 1},
    {"id": 7, "name": "user7", "status": 1},
    {"id": 8, "name": "user8", "status": 1},
]

    # There are two playmodes: "4P" and "8P" (1/2)
    # 4P only has 3 matches:   1 vs 2 & 3 vs 4 
    #                          => 1/2 vs 3/4
    # 8P only has 7 matches:   1 vs 2 & 3 vs 4 & 5 vs 6 & 7 vs 8
    #                          => 1/2 vs 3/4 & 5/6 vs 7/8
    #                          => 1-4 vs 5-8
tournament_history = [
    {"playmode": "1", "match_id": "1", "p1_name": "tester1", "p2_name": "tester2", "winner": "tester1"},
]

users_data = [
    {"id": 1, "username": "user1", "email": "user1@example.com", "password": "user1","bio": "I am a software developer", "field_color": "blue"},
    {"id": 2, "username": "user2", "email": "user2@example.com", "password": "user2","bio": "I am a software developer", "field_color": "white"},
    {"id": 2, "username": "elias", "email": "elias", "password": "elias", "bio": "I am a software developer", "field_color": "blue"},
]
    # Dummy game history data
game_history = [
        {'result': 'win', 'score': '8 : 6', 'against': 'Adriansadasds'},
        {'result': 'lose', 'score': '4 : 10', 'against': 'John'},
        {'result': 'lose', 'score': '9 : 1', 'against': 'Emily'},
        {'result': 'lose', 'score': '9 : 1', 'against': 'Emily'},
        {'result': 'win', 'score': '9 : 1', 'against': 'Emily'},
        {'result': 'win', 'score': '9 : 1', 'against': 'Emily'},
        {'result': 'lose', 'score': '7 : 7', 'against': 'Emily'},
        {'result': 'win', 'score': '7 : 7', 'against': 'Emily'},
        {'result': 'draw', 'score': '7 : 7', 'against': 'Emily'},
        {'result': 'draw', 'score': '7 : 7', 'against': 'Emily'},
        # Add more game results here...
    ]

# Create your views here.
def home(request):
	return render(request, "home/home.html")

@login_required(login_url='login')
def pong(request):
    if request.method == "POST":
        result = request.POST.get('winner')
        score = request.POST.get('result')
        against = request.POST.get('against')
        game = PongGame(name=request.user, result=result, score=score, against=against)
        game.save()
    users_data = User.objects.get(username=request.user)
    return render(request, "pong/pong.html", {'users_data': users_data})
    #users_data = User.objects.get(username=request.user)
    #return render(request, "pong/pong.html", {'users_data': users_data})

@login_required(login_url='login')
def pong_4(request):
    if request.method == "POST":
        result = request.POST.get('winner')
        score = request.POST.get('result')
        against = request.POST.get('against')
        game = PongGame(name=request.user, result=result, score=score, against=against)
        game.save()
    users_data = User.objects.get(username=request.user)
    return render(request, "pong/pong_4.html", {'users_data': users_data})

# @login_required(login_url='login')
# def pong_ai(request):
#     if request.method == "POST":
#         print(request.POST.all())
#     users_data = User.objects.get(username=request.user)
#     return render(request, "pong/pong_ai.html", {'users_data': users_data})
@login_required(login_url='login')
def pong_ai(request):
    if request.method == "POST":
        result = request.POST.get('winner')
        score = request.POST.get('result')
        against = request.POST.get('against')
        game = PongGame(name=request.user, result=result, score=score, against=against)
        game.save()
    users_data = User.objects.get(username=request.user)
    return render(request, "pong/pong_ai.html", {'users_data': users_data})

@login_required(login_url='login')
def pong_tournament_game_4(request):
    match_data = list(TournamentProgress.objects.all())
    users_data = User.objects.get(username=request.user)
    return render(request, "pong/pong_tournament_game_4.html",{
        'player_1': match_data[0].player_1,
        'player_2': match_data[0].player_2,
        'users_data': users_data,
    })


@login_required(login_url='login')
def pong_tournament_game_8(request):
    match_data = list(TournamentProgress.objects.all())
    users_data = User.objects.get(username=request.user)
    return render(request, "pong/pong_tournament_game_8.html",{
        'player_1': match_data[0].player_1,
        'player_2': match_data[0].player_2,
        'users_data': users_data,
    })

@login_required(login_url='login')
def pong_tournament_4_table(request):
    if request.method == "POST" and request.POST.get('name_1'):
        print("==========================")
        print("Welcome to the tournament!")
        print("==========================")
        size = len(TournamentTable.objects.all())
        size -= 1
        while size > -1:
            deleter = TournamentTable.objects.all()[size]
            deleter.delete()
            size -= 1
            
        size_2 = len(TournamentProgress.objects.all())
        size_2 -= 1
        while size_2 > -1:
            deleter_2 = TournamentProgress.objects.all()[size_2]
            deleter_2.delete()
            size_2 -= 1

        names = ["1", "2", "3", "4"]
        names[0] = request.POST.get('name_1')
        names[1] = request.POST.get('name_2')
        names[2] = request.POST.get('name_3')
        names[3] = request.POST.get('name_4')

        i = 1
        for x in names:
            game = TournamentTable(name=x, number=0, status=1, p_id=i)
            game.save()
            i += 1

        tournament_history = TournamentProgress(match_id=1, player_1=names[0], player_2=names[1])
        tournament_history.save()
    elif request.method == "POST" and request.POST.get('winner'):
        print("=======================================================")
        print("Receiving tournament match data...")
        result = request.POST.get('winner') #either win or lose, refers to player 1
        player_1a = TournamentProgress.objects.all()[0].player_1
        player_2a = TournamentProgress.objects.all()[0].player_2
        print("Latest competition:", player_1a, " vs ", player_2a)

        match_idx = TournamentProgress.objects.all()[0].match_id
        if match_idx == "1":
            match_idx = "2"
        elif match_idx == "2":
            match_idx = "3"
        elif match_idx == "3":
            match_idx = "4"
        k = 0
        j = 0
        while j < 4:
            if TournamentTable.objects.all()[j].name == player_1a:
                k = j
            j += 1
        p1 = TournamentTable.objects.all()[k]
        
        j = 0
        while j < 4:
            if TournamentTable.objects.all()[j].name == player_2a:
                k = j
            j += 1
        p2 = TournamentTable.objects.all()[k]
        
        if result == "win":
            if p1.number == "0":
                p1.number = "1"
            elif p1.number == "1":
                p1.number = "2"
            elif p1.number == "2":
                p1.number = "3"
            p2.status = "0"
        else:
            if p2.number == "0":
                p2.number = "1"
            elif p2.number == "1":
                p2.number = "2"
            elif p2.number == "2":
                p2.number = "3"
            p1.status = "0"
        p1.save()
        p2.save()
        
        player_1p = 0
        player_2p = 0
        if match_idx == "2":
            j = 0
            while j < 4:
                if TournamentTable.objects.all()[j].p_id == 3:
                    k = j
                j += 1
            player_1p = TournamentTable.objects.all()[k].name
            
            j = 0
            while j < 4:
                if TournamentTable.objects.all()[j].p_id == 4:
                    k = j
                j += 1
            player_2p = TournamentTable.objects.all()[k].name

        elif match_idx == "3":
            j = 0
            while j < 4:
                if TournamentTable.objects.all()[j].p_id == 1:
                    k = j
                j += 1
            if TournamentTable.objects.all()[k].status == "1":
                player_1p = TournamentTable.objects.all()[k].name
            else:
                j = 0
                while j < 4:
                    if TournamentTable.objects.all()[j].p_id == 2:
                        k = j
                    j += 1
                player_1p = TournamentTable.objects.all()[k].name
                
            j = 0
            while j < 4:
                if TournamentTable.objects.all()[j].p_id == 3:
                    k = j
                j += 1
            if TournamentTable.objects.all()[k].status == "1":
                player_2p = TournamentTable.objects.all()[k].name
            else:
                j = 0
                while j < 4:
                    if TournamentTable.objects.all()[j].p_id == 4:
                        k = j
                    j += 1
                player_2p = TournamentTable.objects.all()[k].name
        
        print("=======================================================")
        print("NAMES: ", TournamentTable.objects.all()[0].name, " ", TournamentTable.objects.all()[1].name, " ", TournamentTable.objects.all()[2].name, " ", TournamentTable.objects.all()[3].name)
        print("SCORES:", TournamentTable.objects.all()[0].number, " ", TournamentTable.objects.all()[1].number, " ", TournamentTable.objects.all()[2].number, " ", TournamentTable.objects.all()[3].number)
        print("STATUS:", TournamentTable.objects.all()[0].status, " ", TournamentTable.objects.all()[1].status, " ", TournamentTable.objects.all()[2].status, " ", TournamentTable.objects.all()[3].status)
        print("TRN ID:", TournamentTable.objects.all()[0].p_id, " ", TournamentTable.objects.all()[1].p_id, " ", TournamentTable.objects.all()[2].p_id, " ", TournamentTable.objects.all()[3].p_id)
        print("=======================================================")
        
        history_killer = TournamentProgress.objects.all()[0]
        history_killer.delete()
        history_saver = TournamentProgress(match_id=match_idx, player_1=player_1p, player_2=player_2p)
        history_saver.save()
        print("NEXT MATCHUP: ", player_1p, " vs ", player_2p)
        print("=======================================================")

    z = 0
    y = 0
    w = 1
    tourney_data = {}
    while y < 4:
        if TournamentTable.objects.all()[z].p_id == w:
            tourney_data[y] = TournamentTable.objects.all()[z]
            w += 1
            y += 1
        z += 1
        if z == 4:
            z = 0
    tourney_history = list(TournamentProgress.objects.all())
    return render(request, "pong/pong_tournament_4_table.html", {
        'player_1': tourney_data[0].name,
        'player_2': tourney_data[1].name,
        'player_3': tourney_data[2].name,
        'player_4': tourney_data[3].name,
        'p1_status': tourney_data[0].status,
        'p2_status': tourney_data[1].status,
        'p3_status': tourney_data[2].status,
        'p4_status': tourney_data[3].status,
        'p1_score': tourney_data[0].number,
        'p2_score': tourney_data[1].number,
        'p3_score': tourney_data[2].number,
        'p4_score': tourney_data[3].number,
        'n_player_1': tourney_history[0].player_1,
        'n_player_2': tourney_history[0].player_2,
        'match_id': tourney_history[0].match_id,
    })


@login_required(login_url='login')
def pong_tournament_8_table(request):
    if request.method == "POST" and request.POST.get('name_1'):
        print("==========================")
        print("Welcome to the tournament!")
        print("==========================")
        size = len(TournamentTable.objects.all())
        size -= 1
        while size > -1:
            deleter = TournamentTable.objects.all()[size]
            deleter.delete()
            size -= 1
            
        size_2 = len(TournamentProgress.objects.all())
        size_2 -= 1
        while size_2 > -1:
            deleter_2 = TournamentProgress.objects.all()[size_2]
            deleter_2.delete()
            size_2 -= 1

        names = ["1", "2", "3", "4", "5", "6", "7", "8"]
        names[0] = request.POST.get('name_1')
        names[1] = request.POST.get('name_2')
        names[2] = request.POST.get('name_3')
        names[3] = request.POST.get('name_4')
        names[4] = request.POST.get('name_5')
        names[5] = request.POST.get('name_6')
        names[6] = request.POST.get('name_7')
        names[7] = request.POST.get('name_8')

        i = 1
        for x in names:
            game = TournamentTable(name=x, number=0, status=1, p_id=i)
            game.save()
            i += 1

        tournament_history = TournamentProgress(match_id=1, player_1=names[0], player_2=names[1])
        tournament_history.save()
    elif request.method == "POST" and request.POST.get('winner'):
        print("=======================================================")
        print("Receiving tournament match data...")
        result = request.POST.get('winner') #either win or lose, refers to player 1
        player_1a = TournamentProgress.objects.all()[0].player_1
        player_2a = TournamentProgress.objects.all()[0].player_2
        print("Latest competition:", player_1a, " vs ", player_2a)

        match_idx = TournamentProgress.objects.all()[0].match_id
        if match_idx == "1":
            match_idx = "2"
        elif match_idx == "2":
            match_idx = "3"
        elif match_idx == "3":
            match_idx = "4"
        elif match_idx == "4":
            match_idx = "5"
        elif match_idx == "5":
            match_idx = "6"
        elif match_idx == "6":
            match_idx = "7"
        elif match_idx == "7":
            match_idx = "8"
        k = 0
        j = 0
        while j < 8:
            if TournamentTable.objects.all()[j].name == player_1a:
                k = j
            j += 1
        p1 = TournamentTable.objects.all()[k]
        
        j = 0
        while j < 8:
            if TournamentTable.objects.all()[j].name == player_2a:
                k = j
            j += 1
        p2 = TournamentTable.objects.all()[k]
        
        if result == "win":
            if p1.number == "0":
                p1.number = "1"
            elif p1.number == "1":
                p1.number = "2"
            elif p1.number == "2":
                p1.number = "3"
            elif p1.number == "3":
                p1.number = "4"
            p2.status = "0"
        else:
            if p2.number == "0":
                p2.number = "1"
            elif p2.number == "1":
                p2.number = "2"
            elif p2.number == "2":
                p2.number = "3"
            elif p2.number == "3":
                p2.number = "4"
            p1.status = "0"
        p1.save()
        p2.save()
        
        player_1p = 0
        player_2p = 0
        if match_idx == "2":
            j = 0
            while j < 8:
                if TournamentTable.objects.all()[j].p_id == 3:
                    k = j
                j += 1
            player_1p = TournamentTable.objects.all()[k].name
            
            j = 0
            while j < 8:
                if TournamentTable.objects.all()[j].p_id == 4:
                    k = j
                j += 1
            player_2p = TournamentTable.objects.all()[k].name
        elif match_idx == "3":
            j = 0
            while j < 8:
                if TournamentTable.objects.all()[j].p_id == 5:
                    k = j
                j += 1
            player_1p = TournamentTable.objects.all()[k].name
            
            j = 0
            while j < 8:
                if TournamentTable.objects.all()[j].p_id == 6:
                    k = j
                j += 1
            player_2p = TournamentTable.objects.all()[k].name
        elif match_idx == "4":
            j = 0
            while j < 8:
                if TournamentTable.objects.all()[j].p_id == 7:
                    k = j
                j += 1
            player_1p = TournamentTable.objects.all()[k].name
            
            j = 0
            while j < 8:
                if TournamentTable.objects.all()[j].p_id == 8:
                    k = j
                j += 1
            player_2p = TournamentTable.objects.all()[k].name
        elif match_idx == "5":
            j = 0
            while j < 8:
                if TournamentTable.objects.all()[j].p_id == 1:
                    k = j
                j += 1
            if TournamentTable.objects.all()[k].status == "1":
                player_1p = TournamentTable.objects.all()[k].name
            else:
                j = 0
                while j < 8:
                    if TournamentTable.objects.all()[j].p_id == 2:
                        k = j
                    j += 1
                player_1p = TournamentTable.objects.all()[k].name
                
            j = 0
            while j < 8:
                if TournamentTable.objects.all()[j].p_id == 3:
                    k = j
                j += 1
            if TournamentTable.objects.all()[k].status == "1":
                player_2p = TournamentTable.objects.all()[k].name
            else:
                j = 0
                while j < 8:
                    if TournamentTable.objects.all()[j].p_id == 4:
                        k = j
                    j += 1
                player_2p = TournamentTable.objects.all()[k].name       
        elif match_idx == "6":
            j = 0
            while j < 8:
                if TournamentTable.objects.all()[j].p_id == 5:
                    k = j
                j += 1
            if TournamentTable.objects.all()[k].status == "1":
                player_1p = TournamentTable.objects.all()[k].name
            else:
                j = 0
                while j < 8:
                    if TournamentTable.objects.all()[j].p_id == 6:
                        k = j
                    j += 1
                player_1p = TournamentTable.objects.all()[k].name
                
            j = 0
            while j < 8:
                if TournamentTable.objects.all()[j].p_id == 7:
                    k = j
                j += 1
            if TournamentTable.objects.all()[k].status == "1":
                player_2p = TournamentTable.objects.all()[k].name
            else:
                j = 0
                while j < 8:
                    if TournamentTable.objects.all()[j].p_id == 8:
                        k = j
                    j += 1
                player_2p = TournamentTable.objects.all()[k].name
        elif match_idx == "7":
            j = 0
            while j < 8:
                if TournamentTable.objects.all()[j].p_id == 1:
                    k = j
                j += 1
            if TournamentTable.objects.all()[k].status == "1":
                player_1p = TournamentTable.objects.all()[k].name
            j = 0
            while j < 8:
                if TournamentTable.objects.all()[j].p_id == 2:
                    k = j
                j += 1
            if TournamentTable.objects.all()[k].status == "1":
                player_1p = TournamentTable.objects.all()[k].name
            j = 0
            while j < 8:
                if TournamentTable.objects.all()[j].p_id == 3:
                    k = j
                j += 1
            if TournamentTable.objects.all()[k].status == "1":
                player_1p = TournamentTable.objects.all()[k].name
            j = 0
            while j < 8:
                if TournamentTable.objects.all()[j].p_id == 4:
                    k = j
                j += 1
            if TournamentTable.objects.all()[k].status == "1":
                player_1p = TournamentTable.objects.all()[k].name
            j = 0
            while j < 8:
                if TournamentTable.objects.all()[j].p_id == 5:
                    k = j
                j += 1
            if TournamentTable.objects.all()[k].status == "1":
                player_2p = TournamentTable.objects.all()[k].name
            j = 0
            while j < 8:
                if TournamentTable.objects.all()[j].p_id == 6:
                    k = j
                j += 1
            if TournamentTable.objects.all()[k].status == "1":
                player_2p = TournamentTable.objects.all()[k].name
            j = 0
            while j < 8:
                if TournamentTable.objects.all()[j].p_id == 7:
                    k = j
                j += 1
            if TournamentTable.objects.all()[k].status == "1":
                player_2p = TournamentTable.objects.all()[k].name
            j = 0
            while j < 8:
                if TournamentTable.objects.all()[j].p_id == 8:
                    k = j
                j += 1
            if TournamentTable.objects.all()[k].status == "1":
                player_2p = TournamentTable.objects.all()[k].name
        
        print("=======================================================")
        print("NAMES: ", TournamentTable.objects.all()[0].name, " ", TournamentTable.objects.all()[1].name, " ", TournamentTable.objects.all()[2].name, " ", TournamentTable.objects.all()[3].name, " ", TournamentTable.objects.all()[4].name, " ", TournamentTable.objects.all()[5].name, " ", TournamentTable.objects.all()[6].name, " ", TournamentTable.objects.all()[7].name)
        print("SCORES:", TournamentTable.objects.all()[0].number, " ", TournamentTable.objects.all()[1].number, " ", TournamentTable.objects.all()[2].number, " ", TournamentTable.objects.all()[3].number, " ", TournamentTable.objects.all()[4].number, " ", TournamentTable.objects.all()[5].number, " ", TournamentTable.objects.all()[6].number, " ", TournamentTable.objects.all()[7].number)
        print("STATUS:", TournamentTable.objects.all()[0].status, " ", TournamentTable.objects.all()[1].status, " ", TournamentTable.objects.all()[2].status, " ", TournamentTable.objects.all()[3].status, " ", TournamentTable.objects.all()[4].status, " ", TournamentTable.objects.all()[5].status, " ", TournamentTable.objects.all()[6].status, " ", TournamentTable.objects.all()[7].status)
        print("TRN ID:", TournamentTable.objects.all()[0].p_id, " ", TournamentTable.objects.all()[1].p_id, " ", TournamentTable.objects.all()[2].p_id, " ", TournamentTable.objects.all()[3].p_id, " ", TournamentTable.objects.all()[4].p_id, " ", TournamentTable.objects.all()[5].p_id, " ", TournamentTable.objects.all()[6].p_id, " ", TournamentTable.objects.all()[7].p_id)
        print("=======================================================")
        
        history_killer = TournamentProgress.objects.all()[0]
        history_killer.delete()
        history_saver = TournamentProgress(match_id=match_idx, player_1=player_1p, player_2=player_2p)
        history_saver.save()
        print("NEXT MATCHUP: ", player_1p, " vs ", player_2p)
        print("=======================================================")
        
    z = 0
    y = 0
    w = 1
    tourney_data = {}
    while y < 8:
        if TournamentTable.objects.all()[z].p_id == w:
            tourney_data[y] = TournamentTable.objects.all()[z]
            w += 1
            y += 1
        z += 1
        if z == 8:
            z = 0
    tourney_history = list(TournamentProgress.objects.all())
    return render(request, "pong/pong_tournament_8_table.html", {
        'player_1': tourney_data[0].name,
        'player_2': tourney_data[1].name,
        'player_3': tourney_data[2].name,
        'player_4': tourney_data[3].name,
        'player_5': tourney_data[4].name,
        'player_6': tourney_data[5].name,
        'player_7': tourney_data[6].name,
        'player_8': tourney_data[7].name,
        'p1_status': tourney_data[0].status,
        'p2_status': tourney_data[1].status,
        'p3_status': tourney_data[2].status,
        'p4_status': tourney_data[3].status,
        'p5_status': tourney_data[4].status,
        'p6_status': tourney_data[5].status,
        'p7_status': tourney_data[6].status,
        'p8_status': tourney_data[7].status,
        'p1_score': tourney_data[0].number,
        'p2_score': tourney_data[1].number,
        'p3_score': tourney_data[2].number,
        'p4_score': tourney_data[3].number,
        'p5_score': tourney_data[4].number,
        'p6_score': tourney_data[5].number,
        'p7_score': tourney_data[6].number,
        'p8_score': tourney_data[7].number,
        'n_player_1': tourney_history[0].player_1,
        'n_player_2': tourney_history[0].player_2,
        'match_id': tourney_history[0].match_id,
    })

@login_required(login_url='login')
def pong_tournament_4(request):
    return render(request, "pong/pong_tournament_4.html")

@login_required(login_url='login')
def pong_tournament_8(request):
    return render(request, "pong/pong_tournament_8.html")

@login_required(login_url='login')
def games(request):
	return render(request, "games/games.html")

@login_required(login_url='login')
def ttt(request):
    if request.method == "POST":
        result = request.POST.get('winner')
        score = request.POST.get('result')
        against = request.POST.get('against')
        game = TTTGame(name=request.user, result=result, score=score, against=against)
        game.save()
        print(game)
    users_data = User.objects.get(username=request.user)
    print(users_data)
    return render(request, "ttt/ttt.html", {'users_data': users_data})
	#return render(request, "ttt/ttt.html")
    
@login_required(login_url='login')
def ttt_new(request):
    if request.method == "POST":
        result = request.POST.get('winner')
        score = request.POST.get('result')
        against = request.POST.get('against')
        game = TTTGame(name=request.user, result=result, score=score, against=against)
        game.save()
        print(game)
    users_data = User.objects.get(username=request.user)
    print(users_data)
    return render(request, "ttt/ttt_new.html", {'users_data': users_data})
	#return render(request, "ttt/ttt_new.html")

@login_required(login_url='login')
def ttt_ai(request):
    if request.method == "POST":
        result = request.POST.get('winner')
        score = request.POST.get('result')
        against = request.POST.get('against')
        game = TTTGame(name=request.user, result=result, score=score, against=against)
        game.save()
        print(game)
    users_data = User.objects.get(username=request.user)
    print(users_data)
    return render(request, "ttt/ttt_ai.html", {'users_data': users_data})

@login_required(login_url='login')
def ttt_new_ai(request):
    if request.method == "POST":
        result = request.POST.get('winner')
        score = request.POST.get('result')
        against = request.POST.get('against')
        game = TTTGame(name=request.user, result=result, score=score, against=against)
        game.save()
        print(game)
    users_data = User.objects.get(username=request.user)
    print(users_data)
    return render(request, "ttt/ttt_new_ai.html", {'users_data': users_data})

@login_required(login_url='login')
def stats(request):
    if request.user.is_authenticated:
        logged_in_user = request.user
        pong_history = PongGame.objects.filter(name=logged_in_user)
        ttt_history = TTTGame.objects.filter(name=logged_in_user)
        pong_win = pong_history.filter(result='win').count()
        pong_draw = pong_history.filter(result='draw').count()
        pong_lose = pong_history.filter(result='lose').count()
        ttt_win = ttt_history.filter(result='win').count()
        ttt_draw = ttt_history.filter(result='draw').count()
        ttt_lose = ttt_history.filter(result='lose').count()
        pong_history_last_8 = list(pong_history.order_by('-id')[:8])
        ttt_history_last_8 = list(ttt_history.order_by('-id')[:8])
        print(pong_history)
        print(ttt_history)
        context = {'pong_history': pong_history_last_8, 'pong_win': pong_win, 'pong_draw': pong_draw, 'pong_lose': pong_lose, 'ttt_history': ttt_history_last_8, 'ttt_win': ttt_win, 'ttt_draw': ttt_draw, 'ttt_lose': ttt_lose}
    return render(request, "stats/stats.html", context)


@login_required(login_url='login')
def profile(request):
    if request.method == 'POST':
        field_color = request.POST.get('field_color')
        user = User.objects.get(username=request.user)
        user.field_color = field_color
        user.save()
        print('Color changed to', user.field_color)
    return render(request, "profile/profile.html", {'users_data': users_data})

@login_required(login_url='login')
def edit_profile(request):
    if request.method == 'POST':
        if request.POST.get('email') != '':
            email = request.POST.get('email')
        if request.POST.get('avatar') != '':
            avatar = request.POST.get('avatar')
        if request.POST.get('bio') != '':
            bio = request.POST.get('bio')
        user = User.objects.get(username=request.user)
        user.email = email
        user.avatar = avatar
        user.bio = bio
        user.save()
        print('Profile edited')
    # Fetch user's data
    user = User.objects.get(username=request.user)
    
    # Pass user's data to the template context
    print(user.email, 'user email', user.username, 'user username', user.bio, 'user bio')
    print(User.objects.all(), 'all users', User.objects.get(username = request.user), 'current user')
    # context = {
    #     'user': user_data,
    #     'email': user_data.email,
    #     # 'avatar': user_data.profile.avatar,
    #     # 'bio': user_data.profile.bio,
    # }
    # print (context)
    return render(request, "edit_profile/edit_profile.html")

def loginPage(request):
    page = 'login'
    if request.user.is_authenticated:
        return redirect('/games')

    if request.method == 'POST':
        username = request.POST.get('username').lower()
        password = request.POST.get('password')

        try:
            user = User.objects.get(username=username)
        except:
            messages.error(request, 'User does not exist')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('/games')
        else:
            messages.error(request, 'Username OR password does not exit')

    context = {'page': page}
    return render(request, 'login_register.html', context)

def registerPage(request):
    form = MyUserCreationForm()
    if request.method == 'POST':
        form = MyUserCreationForm(request.POST)
        print(form)
        print(form.is_valid())
        if form.is_valid():
            print('form is valid')
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()
            login(request, user)
            return redirect('/games')
        else:
            print('form is not valid')
            messages.error(request, 'An error occurred during registration')

    return render(request, 'login_register.html', {'form': form})

def logoutUser(request):
    logout(request)
    return redirect('home')
