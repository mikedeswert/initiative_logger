describe('BoardTemplateController', function() {

    var scope,
        webSocketService,
        boardTemplateService,
        $q,
        deferred;

    beforeEach(function() {
        module('initiativeRollerApp');
        module('boardTemplateControl');

        inject(function($controller, $rootScope, $injector) {
            scope = $rootScope.$new();

            webSocketService = mockito4js.spy($injector.get('webSocketService'));
            boardTemplateService = mockito4js.spy($injector.get('boardTemplateService'));
            $q = $injector.get('$q');
            deferred = $q.defer();

            $controller('BoardTemplateController',
                {
                    $scope: scope,
                    webSocketService: webSocketService,
                    boardTemplateService: boardTemplateService
                }
            );

            scope = mockito4js.spy(scope);
        });
    });

    it('should initialize the variables correctly', function() {
        expect(scope.tempSelectedBoardTemplate.name).toBe('New board');
        expect(scope.tempSelectedBoardTemplate.size).toBe(10);
        expect(scope.selectedBoardTemplate).toEqual({});
        expect(scope.newBoardSize).toBe(0);
        expect(scope.isEditBoardTemplateOpen).toBe(false);
        expect(scope.boardTemplates).toEqual([]);
    });

    it('should set the selectedBoardTemplate on the boardTemplateService given its value changes', function() {
        scope.selectedBoardTemplate = createBoardTemplate();
        scope.$apply();

        mockito4js.verify(boardTemplateService, mockito4js.once()).setSelectedBoardTemplate(scope.selectedBoardTemplate);
    });

    describe('init', function() {
        beforeEach(function() {
            mockito4js.doNothing().when(webSocketService).subscribe(mockito4js.any('string'), mockito4js.any(Function));
        });

        it('should register the controller on the web socket status service', function() {
            scope.init();

            mockito4js.verify(webSocketService, mockito4js.once()).subscribe('BoardTemplateController', mockito4js.any(Function));
        });

        it('should get the board templates and put them on the scope', function() {
            mockito4js.doReturn(deferred.promise).when(boardTemplateService).getBoardTemplates();
            deferred.resolve(['boardTemplateOne', 'boardTemplateTwo']);

            scope.init();
            scope.$apply();

            expect(scope.boardTemplates.length).toBe(2);
            expect(scope.boardTemplates[0]).toBe('boardTemplateOne');
            expect(scope.boardTemplates[1]).toBe('boardTemplateTwo');
        });
    });

    describe('selectBoardTemplate', function() {
        it('should copy the tempSelectedBoardTemplate into the selectedBoardTemplate', function() {
            scope.selectBoardTemplate();

            expect(scope.selectedBoardTemplate.name).toBe('New board');
            expect(scope.selectedBoardTemplate.size).toBe(10);
            scope.tempSelectedBoardTemplate.name = 'New Temp Board Template';
            expect(scope.selectedBoardTemplate.name).toBe('New board');
        });

        it('should put the copied selectedBoardTemplate his size separately on the scope', function() {
            scope.selectBoardTemplate();

            expect(scope.newBoardSize).toBe(10);
        });

        it('should call the openEditBoardTemplate method', function() {
            scope.selectBoardTemplate();

            mockito4js.verify(scope, mockito4js.once()).openEditBoardTemplate();
        });
    });

    describe('isTempBoardTemplateSelected', function() {
        it('should return true given tempSelectedBoardTemplate is not undefined', function() {
            var actual = scope.isTempBoardTemplateSelected();

            expect(actual).toBe(true);
        });

        it('should return false given tempSelectedBoardTemplate is undefined', function() {
            scope.tempSelectedBoardTemplate = undefined;

            var actual = scope.isTempBoardTemplateSelected();

            expect(actual).toBe(false);
        });
    });

    describe('isBoardTemplateSelected', function() {
        it('should call the isBoardTemplateSelected method on the boardTemplateService', function() {
            mockito4js.doReturn(true).when(boardTemplateService).isBoardTemplateSelected();

            var actual = scope.isBoardTemplateSelected();

            expect(actual).toBe(true);
            mockito4js.verify(boardTemplateService, mockito4js.once()).isBoardTemplateSelected();
        });
    });

    describe('isSelectedBoardTemplateValid', function() {
        it('should call the isBoardTemplateValid method on the boardTemplateService with selectedBoardTemplate on scope', function() {
            mockito4js.doReturn(true).when(boardTemplateService).isBoardTemplateValid(scope.selectedBoardTemplate);

            var actual = scope.isSelectedBoardTemplateValid();

            expect(actual).toBe(true);
            mockito4js.verify(boardTemplateService, mockito4js.once()).isBoardTemplateValid(scope.selectedBoardTemplate);
        });
    });

    describe('openCreateBoardTemplate', function() {
        beforeEach(function() {
            mockito4js.doReturn(deferred.promise).when(boardTemplateService).createBoardTemplate(mockito4js.any(Object));
        });

        it('should put a new board template on the selectedBoardTemplate', function() {
            scope.openCreateBoardTemplate();

            expect(scope.selectedBoardTemplate.name).toBe('New board');
            expect(scope.selectedBoardTemplate.size).toBe(10);
        });

        it('should put the board size of the new board template separately on the scope', function() {
            scope.openCreateBoardTemplate();

            expect(scope.newBoardSize).toBe(scope.selectedBoardTemplate.size);
        });

        it('should call the create method on the boardTemplateService with the selectedBoardTemplate', function() {
            scope.openCreateBoardTemplate();

            mockito4js.verify(boardTemplateService, mockito4js.once()).createBoardTemplate(scope.selectedBoardTemplate)
        });

        it('should call the openEditBoardTemplate method when the create callback resolves', function() {
            deferred.resolve();

            scope.openCreateBoardTemplate();
            scope.$apply();

            mockito4js.verify(scope, mockito4js.once()).openEditBoardTemplate();
        });
    });

    describe('openEditBoardTemplate', function() {
        it('should set the isEditBoardTemplateOpen to true', function() {
            scope.isEditBoardTemplateOpen = false;

            scope.openEditBoardTemplate();

            expect(scope.isEditBoardTemplateOpen).toBe(true);
        });
    });

    describe('openSelectBoardTemplate', function() {
        it('should set the isEditBoardTemplateOpen to false', function() {
            scope.isEditBoardTemplateOpen = true;

            scope.openSelectBoardTemplate();

            expect(scope.isEditBoardTemplateOpen).toBe(false);
        });
    });

    describe('saveBoardTemplate', function() {
        it('should call the updateBoardTemplate method on the boardTemplateService with the selectedBoardTemplate', function() {
            scope.selectedBoardTemplate = createBoardTemplate();
            mockito4js.doNothing().when(boardTemplateService).updateBoardTemplate(mockito4js.any(Object));

            scope.saveBoardTemplate();

            mockito4js.verify(boardTemplateService, mockito4js.once()).updateBoardTemplate(scope.selectedBoardTemplate);
        });
    });

    describe('deleteBoardTemplate', function() {
        beforeEach(function() {
            scope.selectedBoardTemplate = createBoardTemplate();
            mockito4js.doReturn(deferred.promise).when(boardTemplateService).deleteBoardTemplate(scope.selectedBoardTemplate);
        });

        it('should call the deleteBoardTemplate method on the boardTemplateService with the selectedBoardTemplate', function() {
            scope.deleteBoardTemplate();

            mockito4js.verify(boardTemplateService, mockito4js.once()).deleteBoardTemplate(scope.selectedBoardTemplate);
        });

        it('should reset the tempSelectedBoard given the deletion is resolved', function() {
            scope.tempSelectedBoardTemplate = {};
            deferred.resolve();

            scope.deleteBoardTemplate();
            scope.$apply();

            expect(scope.tempSelectedBoardTemplate.name).toBe('New board');
            expect(scope.tempSelectedBoardTemplate.size).toBe(10);
        });

        it('should set the selectedBoardTemplate to undefined given the deletion is resolved', function() {
            deferred.resolve();

            scope.deleteBoardTemplate();
            scope.$apply();

            expect(scope.selectedBoardTemplate).toBeUndefined();
        });

        it('should call the openSelectBoardTemplate method given deletion is resolved', function() {
            deferred.resolve();

            scope.deleteBoardTemplate();
            scope.$apply();

            mockito4js.verify(scope, mockito4js.once()).openSelectBoardTemplate();
        });
    });

    function createBoardTemplate() {
        return {name: 'New board', size: 10};
    }

});