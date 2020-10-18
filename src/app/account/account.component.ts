import {Component, OnInit} from '@angular/core';
import {AccountsAndTransactionsService} from './accounts.and.transactions.service';
import {AppSettings} from '../app.settings';
import {ActivatedRoute} from '@angular/router';
import {Account} from './account';
import {forkJoin} from 'rxjs';
import {AccountHelper} from './account.helper';
import {TransactionHelper} from './transaction.helper';
import {TransactionPage} from './transaction.page';

@Component({
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {

  staticFilesUrl = AppSettings.BACKEND_HOSTNAME_STATIC_FILES;
  page: string;
  accountId: string;
  account: Account;
  transactionPage: TransactionPage;
  accountHelper = new AccountHelper();
  transactionHelper = new TransactionHelper();

  constructor(private accountsAndTransactionsService: AccountsAndTransactionsService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(val => {
      this.accountId = this.activatedRoute.snapshot.paramMap.get('accountId');
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.page = params.page;
    });
  }

  ngOnInit(): void {
    forkJoin([
      this.accountsAndTransactionsService.findAccount(this.accountId),
      this.accountsAndTransactionsService.findTransactions(this.accountId, this.page)
    ]).subscribe(result => {
        this.account = result[0];
        this.transactionPage = result[1];
      }
    );
  }


}
